import { Routes } from '@angular/router';
import { SpielplanSeite } from './spielplan-seite/spielplan-seite';

export const routes: Routes = [
  { path: '', component: SpielplanSeite },                 // aktueller Spieltag
  { path: 'spieltag/:nr', component: SpielplanSeite },     // z. B. /spieltag/9
  { path: '**', redirectTo: '' },
];