[out:json][timeout:25];
(
//ganze Schweiz 24h Defis
area["ISO3166-1"="CH"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"]["opening_hours"="24/7"](area.searchArea);
);
// print results
out body;
>;
out skel qt;