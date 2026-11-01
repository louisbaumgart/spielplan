import { Component, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Spielplan } from '../spielplan';
import { Spiel, Spieltag } from '../spiel';
import { SpielKarte } from '../spiel-karte/spiel-karte';

interface Spieltagsdatum {
  datum: string;
  spiele: Spiel[];
}

@Component({
  imports: [SpielKarte, DatePipe, RouterLink],
  selector: 'app-spielplan-seite',
  styleUrl: './spielplan-seite.css',
  templateUrl: './spielplan-seite.html',
})
export class SpielplanSeite {
  private readonly spielplan = inject(Spielplan);

  // Kommt dank withComponentInputBinding() direkt aus der URL /spieltag/:nr
  readonly nr = input<string>();

  // Zustand der Seite – entspricht useState in React
  readonly spieltag = signal<Spieltag | null>(null);
  readonly laedt = signal(true);
  readonly fehler = signal<string | null>(null);

  // Abgeleiteter Zustand – entspricht useMemo in React
  readonly tage = computed(() => gruppiereNachTag(this.spieltag()?.spiele ?? []));

  constructor() {
    // Jedes Mal, wenn sich nr ändert, neu laden.
    // switchMap bricht eine noch laufende Anfrage ab, wenn schnell weitergeklickt wird.
    toObservable(this.nr)
      .pipe(
        tap(() => {
          this.laedt.set(true);
          this.fehler.set(null);
        }),
        switchMap((nr) =>
          this.spielplan.ladeSpieltag(nr ? Number(nr) : undefined).pipe(
            catchError(() => {
              this.fehler.set('Spieldaten konnten nicht geladen werden.');
              return of(null);
            }),
          ),
        ),
        takeUntilDestroyed(), // räumt das Abo auf, wenn die Komponente verschwindet
      )
      .subscribe((spieltag) => {
        this.spieltag.set(spieltag);
        this.laedt.set(false);
      });
  }
}

/** Fasst die Spiele eines Spieltags nach Kalendertag zusammen (Fr / Sa / So). */
function gruppiereNachTag(spiele: Spiel[]): Spieltagsdatum[] {
  const gruppen = new Map<string, Spiel[]>();
  for (const spiel of spiele) {
    const tag = new Date(spiel.anstoss).toDateString(); // lokaler Kalendertag
    gruppen.set(tag, [...(gruppen.get(tag) ?? []), spiel]);
  }
  return [...gruppen.values()].map((s) => ({ datum: s[0].anstoss, spiele: s }));
}