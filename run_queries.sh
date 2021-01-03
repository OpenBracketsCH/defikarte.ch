#!/bin/bash

set -e
set -o pipefail

function cleanup {
  exit $?
}
trap "cleanup" EXIT

DIR="$(cd "$(dirname "$0")" && pwd)"

# Defibrillatoren ganze Schweiz 24h
echo -ne "Query Defibrillatoren ganze Schweiz 24h...           "
cat $DIR/queries/defis_ch_24h.txt | python $DIR/overpass_query.py | osmtogeojson > $DIR/data/defis_ch_24h.geojson
echo -ne "\t\t - Done.\r"
echo ""

# Defibrillatoren ganze Schweiz NICHT 24h
echo -ne "Query Defibrillatoren ganze Schweiz, nicht 24h...           "
cat $DIR/queries/defis_ch_not_24h.txt | python $DIR/overpass_query.py | osmtogeojson > $DIR/data/defis_ch_not_24h.geojson
echo -ne "\t\t - Done.\r"
echo ""

