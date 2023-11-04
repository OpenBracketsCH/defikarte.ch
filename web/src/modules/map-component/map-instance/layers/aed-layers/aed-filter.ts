import Feature from "ol/Feature";
import { Point } from "ol/geom";

export const filterByOpeningHours =
  (type: "247" | "day") =>
  (features: Feature<Point>[]): Feature<Point>[] => {
    if (!features) return [];
    return features.filter((feature) => {
      const openingHours = feature.get("opening_hours");

      switch (type) {
        case "247":
          return openingHours === "24/7";
        case "day":
          return openingHours !== "24/7";
        default:
          return false;
      }
    });
  };
