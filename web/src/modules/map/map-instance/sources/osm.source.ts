import { RasterSourceSpecification } from 'maplibre-gl';

export const createOsmSource = (): RasterSourceSpecification => {
  return {
    type: 'raster',
    tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
    tileSize: 256,
    minzoom: 0,
    maxzoom: 19,
    attribution: '© OpenStreetMap contributors',
  };
};
