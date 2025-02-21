import { StyleSpecification } from "maplibre-gl";

export interface BaseLayerDefinition {
  id: string;
  style?: string | StyleSpecification;
}
