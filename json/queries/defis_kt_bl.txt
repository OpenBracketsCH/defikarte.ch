[out:json][timeout:25];
(
//Kanton Basel Land
area["ISO3166-2"="CH-BL"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;