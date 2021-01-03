[out:json][timeout:25];
(
//Kanton Wallis
area["ISO3166-2"="CH-VS"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;