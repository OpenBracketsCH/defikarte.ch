import { FilterSpecification, LayerSpecification } from 'maplibre-gl';
import { MARKER_GRADIENT_IMAGE_ID } from '../configuration/constants';

const clusterFilter: FilterSpecification = ['has', 'point_count'];

export const createAedClusterLayers = (baseId: string, source: string): LayerSpecification[] => {
  const result = [];

  const clusterPointLayer: LayerSpecification = {
    id: `${baseId}-cluster-point`,
    type: 'symbol',
    source: source,
    layout: {
      'icon-allow-overlap': true,
      'icon-image': MARKER_GRADIENT_IMAGE_ID,
      'icon-size': ['step', ['get', 'point_count'], 0.9, 10, 1.3, 100, 1.7, 1000, 2.1],
    },
    filter: clusterFilter,
  };

  const clusterPointWhiteStrokeLayer: LayerSpecification = {
    id: `${baseId}-cluster-point-white-stroke`,
    type: 'circle',
    source: source,
    paint: {
      'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 100, 40, 1000, 50],
      'circle-color': '#FFFFFF',
      'circle-opacity': 0,
      'circle-stroke-width': 2,
      'circle-stroke-opacity': 1,
      'circle-stroke-color': '#FFFFFF',
    },
    filter: clusterFilter,
  };

  const clusterPointGreenStrokeLayer: LayerSpecification = {
    id: `${baseId}-cluster-point-green-stroke`,
    type: 'circle',
    source: source,
    paint: {
      'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 100, 40, 1000, 50],
      'circle-color': '#FFFFFF',
      'circle-opacity': 0,
      'circle-stroke-width': ['step', ['get', 'point_count'], 8, 10, 10, 100, 12, 1000, 14],
      'circle-stroke-opacity': 0.4,
      'circle-stroke-color': '#93C460',
    },
    filter: clusterFilter,
  };

  const clusterCountLayer: LayerSpecification = {
    id: `${baseId}-cluster-count`,
    type: 'symbol',
    source: source,
    layout: {
      'text-field': ['format', ['get', 'point_count'], { 'font-scale': 1 }],
      'text-font': ['Frutiger Neue Condensed Regular'],
      'text-size': 15,
      'text-pitch-alignment': 'map',
      'text-allow-overlap': true,
      'text-anchor': 'center',
      'text-offset': [-0.05, 0.1],
    },
    paint: {
      'text-color': 'white',
    },
    filter: clusterFilter,
  };

  result.push(clusterPointLayer);
  result.push(clusterPointGreenStrokeLayer);
  result.push(clusterPointWhiteStrokeLayer);
  result.push(clusterCountLayer);

  return result;
};
