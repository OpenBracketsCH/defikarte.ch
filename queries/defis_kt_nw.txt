[out:json][timeout:25];
(
//Kanton Nidwalden
area["ISO3166-2"="CH-NW"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;