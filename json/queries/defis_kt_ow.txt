[out:json][timeout:25];
(
//Kanton Obwalden
area["ISO3166-2"="CH-OW"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;