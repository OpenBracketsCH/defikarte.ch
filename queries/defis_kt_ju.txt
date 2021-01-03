[out:json][timeout:25];
(
//Kanton Jura
area["ISO3166-2"="CH-JU"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;