[out:json][timeout:25];
(
//Kanton Luzern
area["ISO3166-2"="CH-LU"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;