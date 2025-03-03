import { LayerSpecification } from "maplibre-gl";
import { LayerConfiguration } from "../configuration/layer.configuration";
/*
[
        "case",
        ["boolean", ["feature-state", "selected"], false],
        markerGreen, // Red color for selected
        markerOrange, // Blue color for not selected],
      ], 
*/

export const createAedLayerSpec = (): LayerSpecification[] => {
  const singlePointLayer: LayerSpecification = {
    id: LayerConfiguration.aedLayerId,
    source: LayerConfiguration.aedLayerSource,
    type: "symbol",
    paint: {},
    layout: {
      "icon-image": [
        "match",
        ["get", "opening_hours"],
        "24/7",
        "marker-green",
        "marker-orange",
      ],
    },
    filter: ["!", ["has", "point_count"]],
  };

  const singlePointCircleLayer: LayerSpecification = {
    id: LayerConfiguration.aedLayerId + "-circle",
    source: LayerConfiguration.aedLayerSource,
    type: "circle",
    paint: {
      "circle-color": [
        "match",
        ["get", "opening_hours"],
        "24/7",
        "#93C460",
        "#FB8F01",
      ],
      "circle-radius": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        30, // selected
        20, // not selected
      ],
      "circle-opacity": 0.4,
    },
    layout: {},
    filter: ["!", ["has", "point_count"]],
  };

  const clusterPointLayer: LayerSpecification = {
    id: "cluster-point",
    type: "circle",
    source: LayerConfiguration.aedLayerSource,
    filter: ["has", "point_count"],
    paint: {
      "circle-radius": [
        "step",
        ["get", "point_count"],
        20,
        10,
        30,
        100,
        40,
        1000,
        50,
      ],
      "circle-color": "#62AD4B",
      "circle-stroke-width": [
        "step",
        ["get", "point_count"],
        8,
        10,
        10,
        100,
        12,
        1000,
        14,
      ],
      "circle-stroke-opacity": 0.4,
      "circle-stroke-color": "#93C460",
    },
  };

  const clusterPointWhiteStrokeLayer: LayerSpecification = {
    id: "cluster-point-white-stroke",
    type: "circle",
    source: LayerConfiguration.aedLayerSource,
    filter: ["has", "point_count"],
    paint: {
      "circle-radius": [
        "step",
        ["get", "point_count"],
        20,
        10,
        30,
        100,
        40,
        1000,
        50,
      ],
      "circle-color": "#FFFFFF",
      "circle-opacity": 0,
      "circle-stroke-width": 2,
      "circle-stroke-opacity": 1,
      "circle-stroke-color": "#FFFFFF",
    },
  };

  const clusterCountLayer: LayerSpecification = {
    id: "cluster-count",
    type: "symbol",
    source: LayerConfiguration.aedLayerSource,
    filter: ["has", "point_count"],
    layout: {
      "text-field": ["format", ["get", "point_count"], { "font-scale": 1 }],
      "text-font": ["Frutiger Neue Condensed Regular"],
      "text-size": 15,
      "text-pitch-alignment": "map",
      "text-allow-overlap": true,
      "text-anchor": "center",
      "text-offset": [-0.05, 0.1],
    },
    paint: {
      "text-color": "white",
    },
  };

  return [
    clusterPointLayer,
    clusterPointWhiteStrokeLayer,
    clusterCountLayer,
    singlePointCircleLayer,
    singlePointLayer,
  ];
};
