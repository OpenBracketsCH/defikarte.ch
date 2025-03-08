import { FilterSpecification, LayerSpecification } from 'maplibre-gl';

const noClusterFilter: FilterSpecification = ['!', ['has', 'point_count']];

export const createAedPointLayers = (baseId: string, source: string): LayerSpecification[] => {
  const result = [];

  const singlePointLayer: LayerSpecification = {
    id: `${baseId}-single-point`,
    source: source,
    type: 'symbol',
    layout: {
      'icon-allow-overlap': true,
      'icon-image': ['match', ['get', 'opening_hours'], '24/7', 'marker-green', 'marker-orange'],
    },
    filter: noClusterFilter,
  };

  const singlePointCircleLayer: LayerSpecification = {
    id: `${baseId}-single-point-circle`,
    source: source,
    type: 'circle',
    paint: {
      'circle-color': ['match', ['get', 'opening_hours'], '24/7', '#93C460', '#FB8F01'],
      'circle-radius': [
        'case',
        ['boolean', ['feature-state', 'selected'], false],
        30, // selected
        20, // not selected
      ],
      'circle-opacity': 0.4,
    },
    filter: noClusterFilter,
  };

  // order is important
  result.push(singlePointCircleLayer);
  result.push(singlePointLayer);

  return result;
};
