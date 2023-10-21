import { MapComponent } from "../map/MapComponent";
import { toGeoJson } from "../map/openlayers/services/geojson-convert.service";
import "./Home.css";
import { Provider as MapProvider } from "../map/context/MapContext";

type Props = {
  data: any;
};

export const Home = (props: Props) => {
  return (
    <div className="home-home">
      <MapProvider>
        <MapComponent features={toGeoJson(props.data)} />
      </MapProvider>
    </div>
  );
};
