import { FeatureCollection } from "geojson";
import { useEffect, useState } from "react";
import { requestAedData } from "../../../services/aed-data.service";

export const useAedData = () => {
 const [aedData, setAedData] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    const initData = async () => {
      const response = await requestAedData();
      setAedData(response);
    };
    initData();
  }, []);

  return { aedData }
}
