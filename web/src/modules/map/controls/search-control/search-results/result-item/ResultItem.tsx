import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import { filterLabelContent } from '../../../../../../services/address-search.service';
import iconAddress from './../../../../../../assets/icons/icon-marker-circle-green-m.svg';

type Props = {
  item: Feature<Geometry, GeoJsonProperties>;
  onClick: (item: Feature<Geometry, GeoJsonProperties>) => void;
};

export const ResultItem = (props: Props) => {
  const { item } = props;

  const values = filterLabelContent(item.properties?.label);
  const id = item.id?.toString();
  const icon = iconAddress;

  return (
    <div
      key={id}
      className="flex first:pt-3 last:pb-4 px-3 md:px-4 py-1 cursor-pointer items-center last:rounded-b-[24px] last:md:rounded-b-[30px] bg-primary-100-white mx-4 md:mx-0"
      onClick={() => props.onClick(item)}
    >
      <img src={icon} alt="searc-result" />
      <div className="flex flex-col md:flex-row md:items-center ml-3 md:ml-4">
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
