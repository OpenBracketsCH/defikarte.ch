import { Feature, GeoJsonProperties, Geometry, Point } from 'geojson';
import { MapGeoJSONFeature } from 'maplibre-gl';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import iconInfoCircleGreenM from '../../../../assets/icons/icon-info-circle-green-m.svg';
import { AedData } from '../../../../model/app';
import { CreateMode, MapEvent } from '../../../../model/map';
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
  };

  return defaultValues;
};

type CreateAedControlProps = {
  map: MapInstance | null;
  createMode: CreateMode;
  feature: Feature | null;
  setCreateMode: Dispatch<SetStateAction<CreateMode>>;
  onFeatureSelect: (event: MapEvent) => void;
};

export const CreateAedControl = ({
  map,
  createMode,
  feature,
  setCreateMode,
  onFeatureSelect,
}: CreateAedControlProps) => {
  const { t } = useTranslation();
  const form = useForm<AedData>({
    shouldUseNativeValidation: true,
    reValidateMode: 'onChange',
    defaultValues: createDefaultValues(feature),
  });

  const handleCancel = () => {
    form.reset();
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

  const onItemSelect = (feature: Feature<Geometry, GeoJsonProperties>) => {
    const mapGeoJSONFeature = {
      geometry: feature.geometry,
      properties: feature.properties,
      id: feature.id,
      type: feature.type,
      source: 'aed-source',
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
        <div className="absolute top-6 z-[100000] w-full flex flex-row justify-center items-start h-0">
          <div className="flex items-center px-3 md:px-5 py-2 md:py-4 gap-2.5 mx-9 md:mx-0 rounded-[50px] text-xs md:text-base leading-[150%] bg-primary-100-white text-primary-100-green-04">
            <img src={iconInfoCircleGreenM} />
            <span>{t('choosePositionForNewAedOnMap')}</span>
          </div>
        </div>
      )}
      {createMode === CreateMode.form && (
        <AedForm
          map={map}
          onFeatureSelect={onItemSelect}
          form={form}
          setCreateMode={setCreateMode}
        />
      )}
    </>
  );
};
