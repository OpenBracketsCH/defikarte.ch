[out:json][timeout:25];
(
//Kanton Genf
area["ISO3166-2"="CH-GE"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;