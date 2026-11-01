import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spieltag } from './spiel';

// @Service() = ein Singleton, das Angular per Dependency Injection bereitstellt.
// In älterem Code steht stattdessen: @Injectable({ providedIn: 'root' })
@Service()
export class Spielplan {
  private readonly http = inject(HttpClient);

  /** Ohne Nummer: der aktuelle Spieltag. */
  ladeSpieltag(nr?: number): Observable<Spieltag> {
    const pfad = nr ? `/api/spieltage/${nr}` : '/api/spieltage/aktuell';
    return this.http.get<Spieltag>(pfad);
  }
}