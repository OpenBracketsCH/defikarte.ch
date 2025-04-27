import { FeatureCollection } from 'geojson';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import iconCloseDarkGreen from '../../../../assets/icons/icon-close-dark-green.svg';
import iconCloseMiddleGreen from '../../../../assets/icons/icon-close-middle-green.svg';
import iconInfoCircleGreenM from '../../../../assets/icons/icon-info-circle-green-m.svg';
import iconPlusWhite from '../../../../assets/icons/icon-plus-white.svg';
import { Button } from '../../../../components/ui/button/Button';
import { InteractionLayer, OverlayType } from '../../../../model/map';
import { MapConfiguration } from '../../map-instance/configuration/map.configuration';
import ClusterZoomInteraction from '../../map-instance/interactions/cluster-zoom.interaction';
import CursorClickableInteraction from '../../map-instance/interactions/cursor-clickable.interaction';
import ItemMoveInteraction from '../../map-instance/interactions/item-move.interaction';
import ItemSelectInteraction from '../../map-instance/interactions/item-select.interaction';
import { MapInstance } from '../../map-instance/map-instance';

const getRelevantInteractions = (interactions: readonly InteractionLayer[] | undefined) => {
  return interactions?.filter(
    interaction =>
      interaction instanceof ItemSelectInteraction ||
      interaction instanceof ClusterZoomInteraction ||
      interaction instanceof CursorClickableInteraction
  );
};

const createFeature = (featureId: number | string, center: number[]) => {
  return {
    type: 'FeatureCollection',
    features: [
      {
        geometry: { coordinates: center, type: 'Point' },
        type: 'Feature',
        properties: {},
        id: featureId,
      },
    ],
  } as FeatureCollection;
};

const getMoveInteraction = (map: MapInstance | null) => {
  return map
    ?.getActiveMapInteractions()
    .find(
      i => i instanceof ItemMoveInteraction && i.sourceId === MapConfiguration.aedCreateSourceId
    ) as ItemMoveInteraction;
};

type CreateAedControlProps = {
  map: MapInstance | null;
  isCreating: boolean;
  setIsCreating: (isCreating: boolean) => void;
  featureDeselect: () => void;
};

export const CreateAedControl = ({
  map,
  isCreating,
  setIsCreating,
  featureDeselect,
}: CreateAedControlProps) => {
  const { t } = useTranslation();
  const featureId = 42;

  useEffect(() => {
    if (isCreating) {
      featureDeselect();
      getRelevantInteractions(map?.getActiveMapInteractions())?.forEach(interaction => {
        interaction.off();
      });

      const init = async () => {
        await map?.applyOverlay(OverlayType.aedCreate);
        const center = map?.getCenter();
        const data = createFeature(featureId, center!);
        map?.setGeoJSONSourceData(MapConfiguration.aedCreateSourceId, data);

        const interaction: ItemMoveInteraction | undefined = getMoveInteraction(map);
        interaction?.setFeaturePosition(featureId, center!);
      };

      init();
    } else {
      map?.removeOverlay(OverlayType.aedCreate);
      getRelevantInteractions(map?.getActiveMapInteractions())?.forEach(interaction => {
        interaction.on();
      });
    }
  }, [map, isCreating, featureDeselect]);

  return (
    <>
      {!isCreating && (
        <div className="absolute flex flex-col z-[100000] bottom-5 md:bottom-6 left-4 md:left-6">
          <Button
            variant="primary"
            size="large"
            icon={iconPlusWhite}
            onClick={() => setIsCreating(true)}
          >
            {t('create')}
          </Button>
        </div>
      )}
      {isCreating && (
        <>
          <div className="absolute top-6 z-[100000] w-full flex flex-row justify-center items-start h-0">
            <div className="bg-primary-100-white flex rounded-[50px] px-5 py-4 gap-2.5 text-base leading-[150%] items-center text-primary-100-green-04">
              <img src={iconInfoCircleGreenM} />
              <p>{t('choosePositionForNewAedOnMap')}</p>
            </div>
          </div>
          <div className="absolute bottom-6 z-[100000] w-full flex flex-row justify-center items-end h-0">
            <Button
              variant="white"
              size="large"
              icon={iconCloseMiddleGreen}
              iconHover={iconCloseDarkGreen}
              onClick={() => setIsCreating(false)}
            >
              {t('cancel')}
            </Button>
          </div>
        </>
      )}
    </>
  );
};
