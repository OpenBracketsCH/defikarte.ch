import { Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import iconInfoCircleGreenM from '../../../../assets/icons/icon-info-circle-green-m.svg';
import iconPlusWhite from '../../../../assets/icons/icon-plus-white.svg';
import { Button } from '../../../../components/ui/button/Button';
import { CreateMode, OverlayType } from '../../../../model/map';
import { MapConfiguration } from '../../map-instance/configuration/map.configuration';
import ItemMoveInteraction from '../../map-instance/interactions/item-move.interaction';
import { MapInstance } from '../../map-instance/map-instance';
import { AedForm } from './aed-form/AedForm';
import { createFeature, getMoveInteraction, getRelevantInteractions } from './helper';
import { MapButtons } from './map-buttons/MapButtons';

type CreateAedControlProps = {
  map: MapInstance | null;
  createMode: CreateMode;
  setCreateMode: Dispatch<SetStateAction<CreateMode>>;
  featureDeselect: () => void;
};

export const CreateAedControl = ({
  map,
  createMode,
  setCreateMode,
  featureDeselect,
}: CreateAedControlProps) => {
  const { t } = useTranslation();
  const featureId = 42;

  const handleCancel = () => {
    setCreateMode(s => {
      return s === CreateMode.form ? s : CreateMode.none;
    });
  };

  const handleConfirmation = () => {
    setCreateMode(CreateMode.form);
  };

  useEffect(() => {
    if (createMode !== CreateMode.none) {
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
  }, [map, createMode, featureDeselect]);

  return (
    <>
      {createMode === CreateMode.none && (
        <div className="absolute flex flex-col z-[10000] bottom-5 md:bottom-6 left-4 md:left-6">
          <Button
            variant="primary"
            size="large"
            icon={iconPlusWhite}
            onClick={() => setCreateMode(CreateMode.position)}
          >
            {t('create')}
          </Button>
        </div>
      )}
      {createMode === CreateMode.position && (
        <div className="absolute top-6 z-[100000] w-full flex flex-row justify-center items-start h-0">
          <div className="flex items-center px-3 md:px-5 py-2 md:py-4 gap-2.5 mx-9 md:mx-0 rounded-[50px] text-xs md:text-base leading-[150%] bg-primary-100-white text-primary-100-green-04">
            <img src={iconInfoCircleGreenM} />
            <span>{t('choosePositionForNewAedOnMap')}</span>
          </div>
        </div>
      )}
      {createMode !== CreateMode.none && (
        <MapButtons
          createMode={createMode}
          handleCancel={handleCancel}
          handleConfirmation={handleConfirmation}
        />
      )}
      {createMode === CreateMode.form && <AedForm />}
    </>
  );
};
