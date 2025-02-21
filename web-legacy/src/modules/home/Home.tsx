import { MapComponent } from '../map-component/MapComponent';
import './Home.css';

type Props = {
  data: any;
};

export const Home = (props: Props) => {
  return (
    <div className="home-home">
      <MapComponent
        aedData={props.data}
        onFeatureSelected={() => {}}
        onPositionConfirmed={() => {}}
      />
    </div>
  );
};
