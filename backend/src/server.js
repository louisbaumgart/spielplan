const express = require('express');
const { holeAktuellenSpieltag, holeSpiele } = require('./openligadb');
const { zuSpiel } = require('./spiel-mapper');

const app = express();
const PORT = process.env.PORT || 3000;
const SAISON = Number(process.env.SAISON) || 2026; // Saison 2026/27

/**
 * Lädt einen Spieltag und bringt ihn in unser Antwortformat.
 * @param {number} nr
 */
async function ladeSpieltag(nr) {
  const rohSpiele = await holeSpiele(SAISON, nr);
  const spiele = rohSpiele
    .map((s) => zuSpiel(s))
    .sort((a, b) => a.anstoss.localeCompare(b.anstoss));
  return { saison: SAISON, spieltag: nr, spiele };
}

// GET /api/spieltage/aktuell -> der laufende Spieltag
app.get('/api/spieltage/aktuell', async (req, res) => {
  const aktuell = await holeAktuellenSpieltag();
  res.json(await ladeSpieltag(aktuell.groupOrderID));
});

// GET /api/spieltage/9 -> ein bestimmter Spieltag
app.get('/api/spieltage/:nr', async (req, res) => {
  const nr = Number(req.params.nr);
  if (!Number.isInteger(nr) || nr < 1 || nr > 34) {
    return res.status(400).json({ fehler: 'Spieltag muss zwischen 1 und 34 liegen' });
  }
  res.json(await ladeSpieltag(nr));
});

// Fehler-Middleware: Express 5 leitet Fehler aus async-Routen automatisch hierher
app.use((err, req, res, next) => {
  console.error(err);
  res.status(502).json({ fehler: 'Spieldaten konnten nicht geladen werden' });
});

app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});