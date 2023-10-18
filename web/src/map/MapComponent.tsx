import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import "ol/ol.css";
import OSM from "ol/source/OSM.js";
import { useEffect, useState } from "react";
import { AedClusterLayer } from "./layers/aed-cluster-layer/AedClusterLayer";
import React from "react";
import { getAedData } from "./services/aed-data.service";
import { Zoom, ZoomToExtent, defaults as defaultControls } from "ol/control.js";
import { Detail } from "./detail/Detail";

const mapInstance = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [900000, 5950000],
    zoom: 6,
  }),
});

export const MapComponent = () => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);

  const triggerDetail = (data: any) => {
    if (data) {
      setDetailData(data);
      setShowDetail(true);
    } else {
      setShowDetail(false);
    }
  };

  useEffect(() => {
    const initMap = () => {
      mapInstance.getControls().forEach((c) => mapInstance.removeControl(c));
      //var aedLayer = new AedLayer({ minZoom: 14, maxZoom: 20 });
      var aedClusterLayer = new AedClusterLayer({ minZoom: 0 });
      //map.addLayer(aedLayer);
      mapInstance.addLayer(aedClusterLayer);
      getAedData().then((data) => {
        //aedLayer.setData(data);
        aedClusterLayer.setData(data);
      });

      aedClusterLayer.addClusterZoom(mapInstance);
      aedClusterLayer.addSelectFeatureInteraction(mapInstance, triggerDetail);
    };

    initMap();
    if (mapRef) {
      mapInstance.setTarget(mapRef.current as HTMLElement);
    }
  }, [mapRef]);

  return (
    <>
      <Detail hidden={showDetail} data={detailData} />
      <div ref={mapRef} id="map" style={{ height: "100%" }}></div>
    </>
  );
};
