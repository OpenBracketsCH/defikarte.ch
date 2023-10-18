import { MenuBar } from "../components/menu-bar/MenuBar";
import { MapComponent } from "../map/MapComponent";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home-home">
      <MenuBar />
      <MapComponent />
    </div>
  );
};
