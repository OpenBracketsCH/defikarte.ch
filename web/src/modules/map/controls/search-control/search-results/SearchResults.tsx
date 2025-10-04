import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { Dispatch, SetStateAction } from 'react';
import { ResultItem } from './result-item/ResultItem';

type Props = {
  searchResults: FeatureCollection<Geometry, GeoJsonProperties> | null;
  activeIndex: number | null;
  onItemSelect: (item: Feature<Geometry, GeoJsonProperties>) => void;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
};

export const SearchResults = (props: Props) => {
  const handleMouseEnter = (index: number) => {
    props.setActiveIndex(index);
  };

  return (
    <div className="mx-4 md:mx-0 ">
      {props.searchResults?.features.map((feature, i) => {
        return (
          <ResultItem
            item={feature}
            onClick={props.onItemSelect}
            key={feature.id}
            isActive={i === props.activeIndex}
            onMouseEnter={() => handleMouseEnter(i)}
          />
        );
      })}
    </div>
  );
};
