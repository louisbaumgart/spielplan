export interface Team {
  name: string;
  kurzname: string;
  logo: string;
}

export type SpielStatus = 'geplant' | 'live' | 'beendet';

export interface Spiel {
  id: number;
  anstoss: string; // ISO-Zeitstempel in UTC
  heim: Team;
  gast: Team;
  toreHeim: number | null;
  toreGast: number | null;
  status: SpielStatus;
}

export interface Spieltag {
  saison: number;
  spieltag: number;
  spiele: Spiel[];
}