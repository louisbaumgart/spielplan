# Spielplan

Spielplan der 1. Fußball-Bundesliga. Die Web-App zeigt die Spiele eines Spieltags nach Kalendertagen sortiert, und du kannst durch die Spieltage 1–34 blättern. Die Daten kommen von [OpenLigaDB](https://www.openligadb.de/).

## Aufbau

| Ordner | Inhalt |
|---|---|
| `frontend/` | Angular 22 App |
| `backend/` | Express-5-Server, der die Daten von OpenLigaDB holt und aufbereitet |

Im Entwicklungsbetrieb leitet das Frontend alle `/api`-Anfragen über `frontend/proxy.conf.json` an das Backend weiter.

## Voraussetzungen

- Node.js `^22.22.3`, `^24.15.0` oder `>=26.0.0`
- npm

## Starten

Backend und Frontend laufen in je einem eigenen Terminal.

Backend auf <http://localhost:3000>:

```bash
cd backend
npm install
npm run dev
```

Frontend auf <http://localhost:4200>:

```bash
cd frontend
npm install
npm start
```

Danach ist die App unter <http://localhost:4200> erreichbar.

## Konfiguration

Das Backend liest diese optionalen Umgebungsvariablen:

| Variable | Standardwert | Bedeutung |
|---|---|---|
| `PORT` | `3000` | Port des Backends |
| `SAISON` | `2026` | Startjahr der Saison, `2026` steht für 2026/27 |
| `OPENLIGADB_URL` | `https://api.openligadb.de` | Basis-URL der OpenLigaDB-API |

Wenn du `PORT` änderst, passe auch das Ziel in `frontend/proxy.conf.json` an.

## API

| Route | Antwort |
|---|---|
| `GET /api/spieltage/aktuell` | Der laufende Spieltag |
| `GET /api/spieltage/:nr` | Ein bestimmter Spieltag (1–34) |

## Lizenz

Dieses Projekt steht unter keiner Open-Source-Lizenz. Alle Rechte vorbehalten.
