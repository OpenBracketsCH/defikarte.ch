import { FeatureCollection } from "geojson";
import { Feature } from "ol";
import GeoJSON from "ol/format/GeoJSON.js";
import { Point } from "ol/geom";
import {
  webMercatorProjection,
  wgs84Projection,
} from "../constants/projections";

const convertInternal = (data: any) => {
  const geoJson = {
    type: "FeatureCollection",
    features: data.map((feature: any) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [feature.lon, feature.lat],
        },
        properties: {
          id: feature.id,
          ...feature.tags,
        },
      };
    }),
  };

  return geoJson as FeatureCollection;
};

export const toGeoJson = (data: any): Feature<Point>[] => {
  console.log(data);
  if (!data) {
    return [];
  }

  const featureCollection = convertInternal(data);
  return new GeoJSON().readFeatures(featureCollection, {
    dataProjection: wgs84Projection,
    featureProjection: webMercatorProjection,
  }) as Feature<Point>[];
};
