import { get as getProjection, Projection } from "ol/proj";

export const webMercatorProjection = getProjection("EPSG:3857") as Projection;
export const wgs84Projection = getProjection("EPSG:4326") as Projection;
