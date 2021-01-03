[out:json][timeout:25];
(
//Kanton Uri
area["ISO3166-2"="CH-UR"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;