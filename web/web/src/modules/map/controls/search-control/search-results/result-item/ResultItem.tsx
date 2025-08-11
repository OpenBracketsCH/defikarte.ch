import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import iconDefiGreen from './../../../../../../assets/icons/icon-defi-circle-green.svg';
import iconDefiOrange from './../../../../../../assets/icons/icon-defi-circle-orange.svg';
import iconAddress from './../../../../../../assets/icons/icon-marker-circle-green-m.svg';

type Props = {
  item: Feature<Geometry, GeoJsonProperties>;
  onClick: (item: Feature<Geometry, GeoJsonProperties>) => void;
};

export const ResultItem = (props: Props) => {
  const { item } = props;

  const getLabel = (properties: GeoJsonProperties): string[] => {
    if (properties?.emergency === 'defibrillator') {
      const value =
        properties?.['defibrillator:location'] ??
        properties?.description ??
        properties?.operator ??
        'n/A';
      return [value];
    }
    return [properties?.addressPrimary, properties?.addressSecondary].filter(
      x => x !== null || x !== undefined || x !== ''
    );
  };

  const values = getLabel(item.properties || {});
  const id = item.id?.toString();
  const icon =
    item.properties?.emergency === 'defibrillator' && item.properties.opening_hours === '24/7'
      ? iconDefiGreen
      : item.properties?.emergency === 'defibrillator'
      ? iconDefiOrange
      : iconAddress;

  return (
    <div
      key={id}
      className="flex first:pt-3 py-1 last:pt-1 last:pb-4 px-3 md:px-4 items-center last:rounded-b-[24px] last:md:rounded-b-[30px] hover:bg-green-custom bg-primary-100-white cursor-pointer"
      onClick={() => props.onClick(item)}
    >
      <img src={icon} alt="searc-result" className="w-6 h-6" />
      <div className="flex flex-col md:flex-row md:items-center ml-3 md:ml-4 text-nowrap overflow-hidden">
        {values[0] && (
          <span className="md:mr-3 text-sm font-normal text-primary-100-green-04">{values[0]}</span>
        )}
        {values[1] && (
          <span className="text-xs font-normal text-primary-60-green-04">{values[1]}</span>
        )}
      </div>
    </div>
  );
};
