[out:json][timeout:25];
(
//Kanton Bern
area["ISO3166-2"="CH-BE"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;