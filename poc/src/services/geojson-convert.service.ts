import { FeatureCollection } from "geojson";

export const toGeoJson = (data: any): FeatureCollection => {
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
