# 🍺 Brouwerij Admin — Home Assistant Addon

Een Home Assistant addon voor het beheren van een kleine brouwerij. Registreer batches, beheer ingrediënten en voorraad, volg accijnsverplichtingen en synchroniseer met Brewfather — alles vanuit één overzichtelijke interface direct in je HA dashboard. Volledig gemaakt met Claude AI.

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


## Installatie

Voeg deze repo toe aan je Home Assistant apps en installeren maar :) 


