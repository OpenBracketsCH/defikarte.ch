import axios from "../api/backend";
import { FeatureCollection } from "geojson";

export const requestAedData = async (): Promise<FeatureCollection> => {
  try {
    const response = await axios.get<FeatureCollection>("/v2/defibrillator", {
      method: "GET",
      headers: {
        "ACCESS-Control-Allow-Origin": "*",
      },
    });
    if (response.status === 200) {
      const data = await response.data;
      return data;
    }
  } catch (error) {
    console.error(error);
  }

  return {} as FeatureCollection;
};
