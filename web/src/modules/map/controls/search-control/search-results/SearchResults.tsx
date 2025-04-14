import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { ResultItem } from './result-item/ResultItem';

type Props = {
  searchResults: FeatureCollection<Geometry, GeoJsonProperties> | null;
  onItemSelect: (item: Feature<Geometry, GeoJsonProperties>) => void;
};

export const SearchResults = (props: Props) => {
  return (
    <div className="flex rounded-b-[24px] md:rounded-b-[30px] bg-primary-100-white mx-4 md:mx-0">
      <div className="scrollable-container overflow-auto max-h-50 w-full pb-4">
        {props.searchResults?.features.map(feature => (
          <ResultItem item={feature} onClick={props.onItemSelect} key={feature.id} />
        ))}
      </div>
    </div>
  );
};
