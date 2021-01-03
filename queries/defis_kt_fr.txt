[out:json][timeout:25];
(
//Kanton Fribourg
area["ISO3166-2"="CH-FR"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;