import axios from "axios";
import { StyleSpecification } from "maplibre-gl";

export const requestStyleSpecification = async (
  styleUrl: string
): Promise<StyleSpecification | null> => {
  try {
    const response = await axios.get<StyleSpecification>(styleUrl);
    return response.data;
  } catch (e) {
    console.error(e);
  }

  return null;
};
