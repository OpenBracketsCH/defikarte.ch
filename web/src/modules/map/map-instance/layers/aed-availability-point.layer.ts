import { FilterSpecification, LayerSpecification } from 'maplibre-gl';

const layerFilter: FilterSpecification = ['!', ['has', 'point_count']];

export const createAedAvailabilityPointLayers = (
  baseId: string,
  source: string
): LayerSpecification[] => {
  const result = [];
  const singlePointLayer: LayerSpecification = {
    id: `${baseId}-single-point`,
    source: source,
    type: 'symbol',
    layout: {
      'icon-allow-overlap': true,
      'icon-image': 'marker-green',
    },
    filter: layerFilter,
  };

  const singlePointCircleLayer: LayerSpecification = {
    id: `${baseId}-single-point-circle`,
    source: source,
    type: 'circle',
    paint: {
      'circle-color': '#93C460',
      'circle-radius': [
        'case',
        ['boolean', ['feature-state', 'selected'], false],
        30, // selected
        20, // not selected
      ],
      'circle-opacity': 0.4,
    },
    filter: layerFilter,
  };

  result.push(singlePointCircleLayer);
  result.push(singlePointLayer);

  return result;
};
