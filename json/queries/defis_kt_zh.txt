[out:json][timeout:25];
// fetch area “CH-ZH” to search in
area["ISO3166-2"="CH-ZH"]->.searchArea;
// gather results
(
  // query part for: “emergency=defibrillator”
  node["emergency"="defibrillator"](area.searchArea);
  way["emergency"="defibrillator"](area.searchArea);
  relation["emergency"="defibrillator"](area.searchArea);
);
// print results
out body;
>;
out skel qt;
