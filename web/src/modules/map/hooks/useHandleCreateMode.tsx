import { Feature, Point } from 'geojson';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { CreateMode, MapInteractionEvent, OverlayType } from '../../../model/map';
import {
  createFeature,
  deselectAllFeatures,
  getMoveInteraction,
  getRelevantInteractions,
} from '../helper';
import { MapConfiguration } from '../map-instance/configuration/map.configuration';
import ItemMoveInteraction from '../map-instance/interactions/item-move.interaction';
import { MapInstance } from '../map-instance/map-instance';

const featureId = 42;

const getFeaturePosition = (feature: Feature | null): [number, number] => {
  if (!feature || !feature.geometry || feature.geometry.type !== 'Point') {
    return [0, 0];
  }
  const coordinates = (feature.geometry as Point).coordinates;
  return [coordinates[0], coordinates[1]];
};

type UseHandleCreateModeProps = {
  map: MapInstance | null;
  feature: MapInteractionEvent | null;
};

export const useHandleCreateMode = ({
  map,
  feature,
}: UseHandleCreateModeProps): [CreateMode, Dispatch<SetStateAction<CreateMode>>] => {
  const [createMode, setCreateMode] = useState<CreateMode>(CreateMode.none);
  const prevCreateModeRef = useRef<CreateMode>(CreateMode.none);

  useEffect(() => {
    const init = async () => {
      const prevCreateMode = prevCreateModeRef.current;

      // case start creating or editing AED
      if (createMode !== CreateMode.none && prevCreateMode === CreateMode.none) {
        deselectAllFeatures(map);
        getRelevantInteractions(map?.getActiveMapInteractions())?.forEach(interaction => {
          interaction.off();
        });

        await map?.applyOverlay(OverlayType.aedCreate);

        const isEdit = !!feature;
        const center = isEdit ? getFeaturePosition(feature.data) : map?.getCenter();
        const data = createFeature(featureId, center!, isEdit);
        map?.setGeoJSONSourceData(MapConfiguration.aedCreateSourceId, data);
        const interaction: ItemMoveInteraction | undefined = getMoveInteraction(map);
        interaction?.setFeaturePosition(featureId, center!);
      }

      // case change position of AED
      if (createMode === CreateMode.position) {
        const interaction: ItemMoveInteraction | undefined = getMoveInteraction(map);
        interaction?.on();
      }

      // case only change attribtutes, edit of position not allowed
      if (createMode === CreateMode.form) {
        const interaction: ItemMoveInteraction | undefined = getMoveInteraction(map);
        interaction?.off();
      }

      // case edit or create is cancelled / finished
      if (createMode === CreateMode.none && prevCreateMode !== CreateMode.none) {
        map?.removeOverlay(OverlayType.aedCreate);
        getRelevantInteractions(map?.getActiveMapInteractions())?.forEach(interaction => {
          interaction.on();
        });
      }

      prevCreateModeRef.current = createMode;
    };

    init();
  }, [map, createMode, feature]);

  return [createMode, setCreateMode];
};
