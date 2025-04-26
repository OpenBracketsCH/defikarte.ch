import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { ResultItem } from './result-item/ResultItem';

type Props = {
  searchResults: FeatureCollection<Geometry, GeoJsonProperties> | null;
  onItemSelect: (item: Feature<Geometry, GeoJsonProperties>) => void;
};

export const SearchResults = (props: Props) => {
  return (
    <div className="mx-4 md:mx-0 ">
      {props.searchResults?.features.map(feature => (
        <ResultItem item={feature} onClick={props.onItemSelect} key={feature.id} />
      ))}
    </div>
  );
};
