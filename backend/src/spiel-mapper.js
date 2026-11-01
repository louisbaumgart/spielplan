// Übersetzt das Rohformat der OpenLigaDB in unser eigenes, schlankes Format.

/**
 * @typedef {Object} Team
 * @property {string} name
 * @property {string} kurzname
 * @property {string} logo        URL zum Vereinswappen
 */

/**
 * @typedef {Object} Spiel
 * @property {number} id
 * @property {string} anstoss     ISO-Zeitstempel in UTC
 * @property {Team} heim
 * @property {Team} gast
 * @property {number|null} toreHeim   null, solange das Spiel nicht begonnen hat
 * @property {number|null} toreGast
 * @property {'geplant'|'live'|'beendet'} status
 */

/** @returns {Team} */
function zuTeam(rohTeam) {
  return {
    name: rohTeam.teamName,
    kurzname: rohTeam.shortName,
    logo: rohTeam.teamIconUrl,
  };
}

/**
 * Das aktuellste Ergebnis ist das mit der höchsten resultOrderID
 * (z. B. Halbzeit = 1, Endergebnis = 2).
 */
function aktuellesErgebnis(matchResults) {
  if (!matchResults || matchResults.length === 0) return null;
  return [...matchResults].sort((a, b) => b.resultOrderID - a.resultOrderID)[0];
}

/**
 * @param {any} rohSpiel  ein Objekt aus /getmatchdata
 * @param {Date} [jetzt]  injizierbar, damit man es testen kann
 * @returns {Spiel}
 */
function zuSpiel(rohSpiel, jetzt = new Date()) {
  const anstoss = new Date(rohSpiel.matchDateTimeUTC);
  const ergebnis = aktuellesErgebnis(rohSpiel.matchResults);

  let status = 'geplant';
  if (rohSpiel.matchIsFinished) status = 'beendet';
  else if (jetzt >= anstoss) status = 'live';

  return {
    id: rohSpiel.matchID,
    anstoss: anstoss.toISOString(),
    heim: zuTeam(rohSpiel.team1),
    gast: zuTeam(rohSpiel.team2),
    toreHeim: ergebnis ? ergebnis.pointsTeam1 : null,
    toreGast: ergebnis ? ergebnis.pointsTeam2 : null,
    status,
  };
}

module.exports = { zuSpiel };