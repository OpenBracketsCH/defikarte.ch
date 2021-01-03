[out:json][timeout:25];
(
//Kanton Tessin
area["ISO3166-2"="CH-TI"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;