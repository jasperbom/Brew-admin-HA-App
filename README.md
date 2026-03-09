# 🍺 Brouwerij Admin — Home Assistant Addon

Een Home Assistant addon voor het beheren van een kleine ambachtelijke brouwerij. Registreer batches, beheer ingrediënten en voorraad, volg accijnsverplichtingen en synchroniseer met Brewfather — alles vanuit één overzichtelijke interface direct in je HA dashboard.

---

## Functies

### Dashboard
- Overzicht van actieve batches, beschikbare voorraad, open accijns en actieve lots
- Visuele tankstatus per fermentatie- of lagertank
- Waarschuwingen voor verlopen of bijna-verlopen THT-datums

### Ingrediënten
- Beheer ingrediënten met lots, hoeveelheden en THT-datums
- Ondersteuning voor meerdere eenheden en verpakkingstypes
- Mutatielogboek per ingredient

### Batches
- Volledige batch-administratie: naam, stijl, status, tank, datums
- Metingen: OG, FG, ABV, liters, pH-waarden en rendementen
- Kostenoverzicht per batch (electra, water, schoonmaak, overig)
- Ingrediënten koppelen met automatische voorraadaftrek
- Afvullen en uitslaan van gereed bier
- Tankbezetting-validatie (dubbele bezetting wordt geblokkeerd)
- Logboek per batch met alle mutaties

### Recepten
- Brewfather recepten importeren en bekijken
- Voorraadstatus per recept: zie direct of ingrediënten beschikbaar zijn

### Uitgeslagen Voorraad
- Overzicht per bier, batch en verpakkingstype
- Verkochte stuks bijhouden per uitslag
- Artikelenstambestand met SKU, EAN, verkoopprijs en BTW-percentage
- Rode markering voor uitslagen waarover accijns nog niet betaald is
- Archivering van volledig verkochte uitslagen

### Accijns
- Automatische accijnsberekening bij uitslaan (liters × ABV × tarief)
- Overzicht van open en betaalde aangiftes
- Markeer accijns als betaald met één klik

### Instellingen
- Tanks toevoegen en beheren
- Brewfather API koppeling (User ID + API key)
- Accijnstarieven instellen
- Export en import van alle data (JSON backup)

---

---

## Installatie

Er zijn twee manieren om deze addon te installeren.

### Optie 1 — Lokale addon (eenvoudigst, geen GitHub nodig)

1. Zorg dat je toegang hebt tot je HA bestanden (bijv. via Samba addon of SSH)
2. Kopieer de map `brouwerij-admin-addon/` naar:
   ```
   /config/addons/brouwerij-admin/
   ```
3. Ga in HA naar **Instellingen → Addons → Addon Store**
4. Klik rechtsboven op de drie puntjes → **Controleer op updates**
5. De addon verschijnt nu onder **Lokale addons** — klik op installeren
6. Start de addon en open via de zijbalk

### Optie 2 — Via GitHub repository

1. Maak een nieuw GitHub-repository aan (bijv. `brouwerij-admin-addon`)
2. Push de inhoud van de `brouwerij-admin-addon/` map naar de root van dat repo
3. Ga in HA naar **Instellingen → Addons → Addon Store**
4. Klik rechtsboven op de drie puntjes → **Repositories**
5. Voeg de GitHub URL toe, bijv.:
   ```
   https://github.com/jouw-gebruikersnaam/brouwerij-admin-addon
   ```
6. De addon verschijnt nu in de store — installeer en start

---

## Gebruik

Na installatie en starten verschijnt **Brouwerij** met een bier-icoontje in de HA zijbalk. Klik daarop om de app te openen.

De data wordt opgeslagen in de **browser** (localStorage), net als de standalone HTML versie.

---

## Bestanden

| Bestand | Omschrijving |
|---|---|
| `config.yaml` | HA addon configuratie |
| `Dockerfile` | Docker image definitie |
| `nginx.conf` | Webserver configuratie |
| `brouwerij-nano.html` | De app zelf |

---

## Updates

Als je de app wilt updaten:
1. Vervang `brouwerij-nano.html` met de nieuwe versie
2. Verhoog het versienummer in `config.yaml`
3. Herinstalleer of herbouw de addon in HA
