import { MapComponent } from "../map/MapComponent";
import { toGeoJson } from "../map/openlayers/services/geojson-convert.service";
import "./Home.css";

type Props = {
  data: any;
};

export const Home = (props: Props) => {
  return (
    <div className="home-home">
      <MapComponent features={toGeoJson(props.data)} />
    </div>
  );
};
