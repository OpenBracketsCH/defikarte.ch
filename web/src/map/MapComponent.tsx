import { Feature } from "ol";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { Point } from "ol/geom";
import "ol/ol.css";
import React, { useEffect, useState } from "react";
import "./MapComponent.css";
import { Detail } from "./detail/Detail";
import { Menu } from "./menu/Menu";
import { AedClusterLayer } from "./openlayers/layers/aed-layers/AedClusterLayer";

export const mapInstance = new Map({
  layers: [],
  view: new View({
    center: [905000, 5900000], // todo: save last view in local storage
    zoom: 8,
  }),
});

type Props = {
  features: Feature<Point>[];
};

export const MapComponent = (props: Props) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);

  const triggerDetail = (data: any) => {
    if (data) {
      setDetailData(data);
      setShowDetail(true);
    } else {
      setShowDetail(false);
      setDetailData(null);
    }
  };

  useEffect(() => {
    const initBaseMap = () => {
      mapInstance.getControls().forEach((c) => mapInstance.removeControl(c));
    };

    initBaseMap();
    if (mapRef) {
      mapInstance.setTarget(mapRef.current as HTMLElement);
    }
  }, [mapRef]);

  useEffect(() => {
    var aedClusterLayer = new AedClusterLayer({ minZoom: 0 });
    mapInstance.addLayer(aedClusterLayer);
    aedClusterLayer.setData(props.features);

    aedClusterLayer.addClusterZoom(mapInstance);
    aedClusterLayer.addSelectFeatureInteraction(mapInstance, triggerDetail);
  }, [props.features]);

  return (
    <div className="map-component-main">
      <Menu />
      <div
        ref={mapRef}
        id="map"
        style={{ height: "100%", width: "100%" }}
      ></div>
      <Detail hidden={showDetail} data={detailData} />
    </div>
  );
};
