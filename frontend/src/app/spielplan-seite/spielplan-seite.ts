import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Spielplan } from '../spielplan';
import { Spieltag } from '../spiel';
import { SpielKarte } from '../spiel-karte/spiel-karte';

@Component({
  imports: [SpielKarte],
  selector: 'app-spielplan-seite',
  styleUrl: './spielplan-seite.css',
  templateUrl: './spielplan-seite.html',
})
export class SpielplanSeite {
  private readonly spielplan = inject(Spielplan);

  // Zustand – entspricht useState in React
  readonly spieltag = signal<Spieltag | null>(null);

  constructor() {
    this.spielplan
      .ladeSpieltag()
      .pipe(takeUntilDestroyed())          // Abo endet, wenn die Komponente verschwindet
      .subscribe((st) => this.spieltag.set(st));
  }
}