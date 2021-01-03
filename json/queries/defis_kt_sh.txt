[out:json][timeout:25];
(
//Kanton Schaffhausen
area["ISO3166-2"="CH-SH"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;