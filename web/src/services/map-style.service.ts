import { StyleSpecification } from "maplibre-gl";
import axios from "../api/backend";

export const requestStyleSpecification = async (
  styleUrl: string
): Promise<StyleSpecification> => {
  try {
    const response = await axios.get<StyleSpecification>(styleUrl);
    return response.data;
  } catch (e) {
    console.error(e);
  }

  return {} as StyleSpecification;
};
