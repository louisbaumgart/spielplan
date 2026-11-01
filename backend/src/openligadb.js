// Kapselt alle Aufrufe an die externe OpenLigaDB-API.
// Node 18+ hat fetch eingebaut – kein axios nötig.

const BASIS_URL = process.env.OPENLIGADB_URL || 'https://api.openligadb.de';
const LIGA = 'bl1'; // 1. Bundesliga

async function holeJson(pfad) {
  const antwort = await fetch(`${BASIS_URL}${pfad}`);
  if (!antwort.ok) {
    throw new Error(`OpenLigaDB antwortet mit ${antwort.status} für ${pfad}`);
  }
  return antwort.json();
}

/** Liefert den aktuellen Spieltag, z. B. { groupName: '9. Spieltag', groupOrderID: 9, ... } */
function holeAktuellenSpieltag() {
  return holeJson(`/getcurrentgroup/${LIGA}`);
}

/** Liefert alle Spiele eines Spieltags im Rohformat der OpenLigaDB. */
function holeSpiele(saison, spieltag) {
  return holeJson(`/getmatchdata/${LIGA}/${saison}/${spieltag}`);
}

module.exports = { holeAktuellenSpieltag, holeSpiele };