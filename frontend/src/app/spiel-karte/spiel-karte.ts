import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Spiel } from '../spiel';

@Component({
  imports: [DatePipe],
  selector: 'app-spiel-karte',
  styleUrl: './spiel-karte.css',
  templateUrl: './spiel-karte.html',
})
export class SpielKarte {
  // Entspricht in React: function SpielKarte({ spiel }) – nur als Signal
  readonly spiel = input.required<Spiel>();
}