# Defi Archiv Schweiz

![data screenshot](data.png)

Sammlung von JSON Files für die Defikarte.ch und deren Partner die in Zukunft Daten beziehen möchten.
Die Daten können hier bezogen werden: [`data` Verzeichnis](https://github.com/chnuessli/defi_archive/tree/main/data)
**Wichtig**
Die Daten sind direkt aus OSM exportiert.

## Sinn und Zweck

Sinn dieses Archivs ist es, Datenveränderungen täglich nachzuvollziehen. Täglich wird nun automatisiert ein GeoJSON generiert und somit Datenveränderungen dokumentiert.
Die JSON Datensammlung soll stetig wachsen und so ein sauberes Archiv generieren.

## Overpass Abfragen via Overpass API

Die Abfragen sind immer gleich aufgebaut, hier ein paar Beispiele. Für alle Abfragen besuche bitte die TXT Files. Die TXT Files dazu findet man in `queries`.

Umgebaute Queries die mit der Overpass API korrespondieren können.

<details><summary>Abfragen ausklappen</summary>
<p>

## Defibrillatoren

### Dispogebiet SRZ

```json
[out:json][timeout:25];
(
//Kanton Zürich
area["ISO3166-2"="CH-ZH"];
//Kanton Schwyz
area["ISO3166-2"="CH-SZ"];
//Kanton Schaffhausen
area["ISO3166-2"="CH-SH"];
//Kanton Zug
area["ISO3166-2"="CH-ZG"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;
```

### Kanton ZH

```json
[out:json][timeout:25];
// fetch area “CH-ZH” to search in
area["ISO3166-2"="CH-ZH"]->.searchArea;
// gather results
(
  // query part for: “emergency=defibrillator”
  node["emergency"="defibrillator"](area.searchArea);
  way["emergency"="defibrillator"](area.searchArea);
  relation["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;
```

### Stadt ZH

```json
[out:json][timeout:25];
area[name="Zürich"]["wikipedia"="de:Zürich"]->.zurich;
// gather results
(
  node["emergency"="defibrillator"](area.zurich);
  way["emergency"="defibrillator"](area.zurich);
  relation["emergency"="defibrillator"](area.zurich);
);
// print results
out body;
>;
out skel qt;
```

### Kanton SG

```json
[out:json][timeout:25];
(
//Kanton St. Gallen
area["ISO3166-2"="CH-SG"];
//Kanton Glarus
area["ISO3166-2"="CH-GL"];
//Kanton Appenzell Innerhoden
area["ISO3166-2"="CH-AI"];
//Kanton Appenzell Ausserhoden
area["ISO3166-2"="CH-AR"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;
```

### KNZ St.Gallen

```json
[out:json][timeout:25];
(
//Kanton St. Gallen
area["ISO3166-2"="CH-SG"];
//Kanton Glarus
area["ISO3166-2"="CH-GL"];
//Kanton Appenzell Innerhoden
area["ISO3166-2"="CH-AI"];
//Kanton Appenzell Ausserhoden
area["ISO3166-2"="CH-AR"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;
```

### Defikarte.ch 24h Defis

Dieses JSON wird für die Webseite Defikarte.ch benötigt.

```json
[out:json][timeout:25];
(
//ganze Schweiz 24h Defis
area["ISO3166-1"="CH"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"]["opening_hours"="24/7"](area.searchArea);
);
// print results
out body;
>;
out skel qt;
```

### Defikarte.ch NICHT 24h Defis

Dieses JSON wird für die Webseite Defikarte.ch benötigt.

```json
[out:json][timeout:25];
(
//ganze Schweiz
area["ISO3166-1"="CH"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"]["opening_hours"!="24/7"](area.searchArea);
);
// print results
out body;
>;
out skel qt;
```

</p>
</details>

## Automation

[![Get data from Overpass](https://github.com/Schutz-Rettung-Zurich/json-archive/workflows/Get%20data%20from%20Overpass/badge.svg)](https://github.com/Schutz-Rettung-Zurich/json-archive/actions?query=workflow%3A%22Get+data+from+Overpass%22)

In diesem Repository sind GitHub Actions eingerichtet, um täglich aktuelle Daten via [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API) abzufragen und als GeoJSON abzulegen.

* Die aktuelle GeoJSON-Dateien sind im [`data` Verzeichnis](https://github.com/Schutz-Rettung-Zurich/json-archive/tree/main/data)
* Die GitHub Actions sind im [`overpass.yml`](https://github.com/Schutz-Rettung-Zurich/json-archive/blob/main/.github/workflows/overpass.yml) Workflow beschrieben
* Der Workflow verwendet das Skript [`run_queries.sh`](https://github.com/Schutz-Rettung-Zurich/json-archive/blob/main/run_queries.sh) um alle Queries laufen zu lassen
* Jedes Overpass-Query ist in einer eigenen Datei im [Verzeichnis `queries`](https://github.com/Schutz-Rettung-Zurich/json-archive/tree/main/queries) abgelegt

### Neues Query hinzufügen

Um ein neues Query hinzuzufügen, müssen folgende Schritte befolgt werden:

1. Query schreiben und via http://overpass-turbo.osm.ch/ testen. **ACHTUNG:** es ist nur die Overpass Query Syntax unterstützt, **keine [Overpass Turbo Shortcuts](https://wiki.openstreetmap.org/wiki/Overpass_turbo/Extended_Overpass_Turbo_Queries)** (z.B. ` {{geocodeArea:CH-ZH}}`)
1. Query als neue Datei in [`queries` Verzeichnis](https://github.com/Schutz-Rettung-Zurich/json-archive/tree/main/queries) ablegen
1. Neues Query in [`run_queries.sh`](https://github.com/Schutz-Rettung-Zurich/json-archive/blob/main/run_queries.sh) aufrufen
