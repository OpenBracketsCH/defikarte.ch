import { Feature, GeoJsonProperties, Geometry, Point } from 'geojson';
import { MapGeoJSONFeature } from 'maplibre-gl';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import iconInfoCircleGreenM from '../../../../assets/icons/icon-info-circle-green-m.svg';
import { AedData } from '../../../../model/app';
import { CreateMode, MapInteractionEvent } from '../../../../model/map';
import { getActiveAedOverlay } from '../../helper';
import { FEATURE_STATE } from '../../map-instance/configuration/constants';
import { MapConfiguration } from '../../map-instance/configuration/map.configuration';
import { MapInstance } from '../../map-instance/map-instance';
import { AedForm } from './aed-form/AedForm';
import { MapButtons } from './map-buttons/MapButtons';

const createDefaultValues = (feature: Feature | null): AedData | undefined => {
  if (!feature) {
    return {
      latitude: 0,
      longitude: 0,
      description: '',
      operator: '',
      operatorPhone: '',
      openingHours: '',
      location: '',
      id: '',
      level: '',
      access: undefined,
      indoor: undefined,
      reporter: '',
      sourceFeature: undefined,
    };
  }

  const defaultValues: AedData = {
    latitude: (feature.geometry as Point).coordinates[1],
    longitude: (feature.geometry as Point).coordinates[0],
    description: feature.properties?.description || '',
    operator: feature.properties?.operator || '',
    operatorPhone: feature.properties?.phone || '',
    openingHours: feature.properties?.opening_hours || '',
    location: feature.properties?.['defibrillator:location'] || '',
    id: feature.id?.toString() || '',
    level: feature.properties?.level || '',
    access: feature.properties?.access || 'yes',
    indoor: feature.properties?.indoor || 'no',
    reporter: '',
    sourceFeature: feature,
  };

  return defaultValues;
};

type CreateAedControlProps = {
  map: MapInstance | null;
  createMode: CreateMode;
  feature: MapInteractionEvent | null;
  setEditFeature: Dispatch<SetStateAction<MapInteractionEvent | null>>;
  setCreateMode: Dispatch<SetStateAction<CreateMode>>;
  onFeatureSelect: (event: MapInteractionEvent) => void;
};

export const CreateAedControl = ({
  map,
  createMode,
  feature,
  setEditFeature,
  setCreateMode,
  onFeatureSelect,
}: CreateAedControlProps) => {
  const { t } = useTranslation();
  const form = useForm<AedData>({
    shouldUseNativeValidation: true,
    reValidateMode: 'onChange',
    defaultValues: createDefaultValues(feature?.data || null),
  });

  const handleCancel = () => {
    form.reset();
    if (feature) {
      map?.setFeatureState(feature.source || '', feature.data?.id, {
        [FEATURE_STATE.EDITING]: false,
      });
    }
    setEditFeature(null);
    setCreateMode(CreateMode.none);
  };

  const handleConfirmPosition = async () => {
    const data = await map?.getGeoJsonSourceData(MapConfiguration.aedCreateSourceId);
    if (!data) {
      setCreateMode(CreateMode.none);
      return;
    }

    const feature = data.features[0];
    const lat = (feature.geometry as Point).coordinates[1];
    const lng = (feature.geometry as Point).coordinates[0];
    form.setValue('latitude', lat);
    form.setValue('longitude', lng);
    setCreateMode(CreateMode.form);
  };

  const handleChangePosition = () => {
    setCreateMode(CreateMode.position);
  };

  const handleOnSuccess = (successFeature: Feature<Geometry, GeoJsonProperties>) => {
    if (feature) {
      map?.setFeatureState(feature.source || '', feature.data?.id, {
        [FEATURE_STATE.EDITING]: false,
      });
    }

    const activeSourceId = getActiveAedOverlay(map);
    const mapGeoJSONFeature = {
      geometry: successFeature.geometry,
      properties: successFeature.properties,
      id: successFeature.id,
      type: successFeature.type,
      source: feature?.source || activeSourceId,
    } as MapGeoJSONFeature;

    onFeatureSelect({
      source: mapGeoJSONFeature.source,
      data: mapGeoJSONFeature,
      type: 'item-select',
    });
  };

  return (
    <>
      <MapButtons
        createMode={createMode}
        handleCancel={handleCancel}
        handleConfirmPosition={handleConfirmPosition}
        handleChangePosition={handleChangePosition}
      />
      {createMode === CreateMode.position && (
        <div className="absolute top-6 z-10 w-full flex flex-row justify-center items-start h-0">
          <div className="flex items-center px-3 md:px-5 py-2 md:py-4 gap-2.5 mx-9 md:mx-0 rounded-[50px] text-xs md:text-base leading-[150%] bg-primary-100-white text-primary-100-green-04">
            <img src={iconInfoCircleGreenM} />
            <span>{t('choosePositionForNewAedOnMap')}</span>
          </div>
        </div>
      )}
      {createMode === CreateMode.form && (
        <AedForm map={map} onSuccess={handleOnSuccess} form={form} setCreateMode={setCreateMode} />
      )}
    </>
  );
};
