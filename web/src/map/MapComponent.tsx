import { Feature } from "ol";
import { Point } from "ol/geom";
import React, { useContext, useEffect } from "react";
import "./MapComponent.css";
import { Context as MapContext } from "./context/MapContext";
import { Menu } from "./menu/Menu";
import {
  LayerConfiguration,
  availableLayers,
  defaultLayers,
} from "./openlayers/configuration/layer.configuration";
import { MapInstance } from "./openlayers/map-instance";
import { LayerMangaerService } from "./openlayers/services/layer-manager.service";

type Props = {
  features: Feature<Point>[];
};

export const mapInstance = new MapInstance(availableLayers);
export const layerManager = new LayerMangaerService(availableLayers);

export const MapComponent = (props: Props) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const { state, setLayerVisible } = useContext(MapContext);

  useEffect(() => {
    const initBaseMap = () => {
      mapInstance.initMap();
      defaultLayers.forEach((layer) => {
        setLayerVisible(layer, true);
      });
    };

    initBaseMap();
    if (mapRef) {
      mapInstance.setTarget(mapRef.current as HTMLElement);
    }

    return () => {
      mapInstance.disposeMap();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef]);

  useEffect(() => {
    mapInstance.initializeData(props.features);
  }, [props.features]);

  useEffect(() => {
    availableLayers.forEach((layer: LayerConfiguration) => {
      const isVisble = state.includes(layer.type);
      layerManager.setLayerVisibility(layer.type, isVisble);
    });
  }, [state]);

  return (
    <div className="map-component-main">
      <Menu />
      <div
        ref={mapRef}
        id="map"
        style={{ height: "100%", width: "100%" }}
      ></div>
    </div>
  );
};
