[out:json][timeout:25];
(
//Kanton Glarus
area["ISO3166-2"="CH-GL"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;