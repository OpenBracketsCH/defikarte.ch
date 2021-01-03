[out:json][timeout:25];
(
//Kanton St. Gallen
area["ISO3166-2"="CH-SG"];
//Kanton Glarus
area["ISO3166-2"="CH-GL"];
//Kanton Appenzell Innerhoden
area["ISO3166-2"="CH-AI"];
//Kanton Appenzell Ausserhoden
area["ISO3166-2"="CH-AR"];
)->.searchArea;
// gather results
(
nwr["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;