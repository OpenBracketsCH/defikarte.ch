import { Feature } from 'ol';
import { Point } from 'ol/geom';
import Layer from 'ol/layer/Layer';
import React, { useEffect } from 'react';
import { LayerId } from '../../model/map';
import './MapComponent.css';
import { MapConfiguration } from './configuration/map.configuration';
import { Detail } from './detail/Detail';
import { useLayerVisibility } from './hooks/useLayerVisibility';
import { AedClusterLayer } from './map-instance/layers/aed-layers/AedClusterLayer';
import { MapInstance } from './map-instance/map-instance';
import { Menu } from './menu/Menu';
import { SelectPosition } from './select-position/SelectPosition';

type Props = {
  aedData: Feature<Point>[];
  onFeatureSelected: (feature: Feature<Point>) => void;
  onPositionConfirmed: (feature: Feature<Point>) => void;
};

const mapInstance = new MapInstance();
const layers: Map<LayerId, Layer> = new Map();

export const MapComponent = (props: Props) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const { state: enabledLayers, setLayerVisible } = useLayerVisibility(
    MapConfiguration.defaultLayers
  );
  const [selectedFeatures, setSelectedFeatures] = React.useState<Feature<Point>[]>([]);

  const showLayer = (layerId: LayerId, data?: Feature<Point>[]) => {
    const isLayerExisting = layers.get(layerId);
    if (!isLayerExisting) {
      switch (layerId) {
        case LayerId.OsmSwiss:
          layers.set(layerId, MapConfiguration.createOsmSwissLayer());
          break;
        case LayerId.OsmCommon:
          layers.set(layerId, MapConfiguration.createOsmCommonLayer());
          break;
        case LayerId.Swisstopo:
          layers.set(layerId, MapConfiguration.createSwisstopoLayer());
          break;
        case LayerId.Satellite:
          layers.set(layerId, MapConfiguration.createSatelliteLayer());
          break;
        case LayerId.Aed247:
          layers.set(layerId, MapConfiguration.createAed247Layer());
          break;
        case LayerId.AedRestricted:
          layers.set(layerId, MapConfiguration.createAedRestrictedLayer());
          break;
        case LayerId.AedByOpeningHours:
          layers.set(layerId, MapConfiguration.createAedByOpeningHoursLayer());
          break;
        case LayerId.SelectPosition:
          layers.set(layerId, MapConfiguration.createSelectPositionLayer());
          break;
      }
    }

    const layer = layers.get(layerId);
    if (layer) {
      mapInstance.showLayer(layer);
    }

    switch (layerId) {
      case LayerId.Aed247:
      case LayerId.AedRestricted:
      case LayerId.AedByOpeningHours:
        (layer as AedClusterLayer).setData(data);
        mapInstance.addInteractions(
          (layer as AedClusterLayer).getInteractions(data => setSelectedFeatures(data))
        );
        break;
    }
  };

  const hideLayer = (layerId: LayerId) => {
    const layer = layers.get(layerId);
    if (layer) {
      mapInstance.hideLayer(layer);
      switch (layerId) {
        case LayerId.Aed247:
        case LayerId.AedRestricted:
        case LayerId.AedByOpeningHours:
          // remove interactions and stuff
          break;
      }
    }
  };

  useEffect(() => {}, [props.aedData, enabledLayers]);

  useEffect(() => {
    enabledLayers.forEach(layer => {
      showLayer(layer, props.aedData);
    });

    layers.forEach((layer, layerId) => {
      if (!enabledLayers.includes(layerId)) {
        hideLayer(layerId);
      }
    });
  }, [enabledLayers, props.aedData]);

  useEffect(() => {
    if (mapRef) {
      mapInstance.setTarget(mapRef.current as HTMLElement);
    }
  }, [mapRef]);

  return (
    <div className="map-container">
      <Menu
        hidden={selectedFeatures.length > 0}
        enabledLayers={enabledLayers}
        setLayerVisible={setLayerVisible}
      />
      <SelectPosition
        hidden={false}
        onSubmitPosition={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <div ref={mapRef} id="map"></div>
      <Detail data={selectedFeatures} closeAction={() => setSelectedFeatures([])} />
    </div>
  );
};
