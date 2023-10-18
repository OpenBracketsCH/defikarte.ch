import { Feature } from 'ol'
import GeoJSON from "ol/format/GeoJSON.js";
import { Point } from "ol/geom";
import {
  webMercatorProjection,
  wgs84Projection,
} from "../constants/projections";
import { toGeoJson } from "./geojson-convert.service";

export const getAedData = async (): Promise<Feature<Point>[]> => {
  try {
    const response = await fetch(
      "https://defikarte-backend-staging.azurewebsites.net/api/defibrillator",
      {
        method: "GET",
        headers: {
          "ACCESS-Control-Allow-Origin": "*",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      const features = new GeoJSON().readFeatures(toGeoJson(data), {
        dataProjection: wgs84Projection,
        featureProjection: webMercatorProjection,
      }) as Feature<Point>[];
      return features;
    }
  } catch (error) {
    console.error(error);
  }

  return [];
};
