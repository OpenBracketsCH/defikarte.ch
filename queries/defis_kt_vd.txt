[out:json][timeout:25];
(
//Kanton Waadt
area["ISO3166-2"="CH-VD"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;