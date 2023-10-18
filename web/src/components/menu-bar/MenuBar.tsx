import "./MenuBar.css";
import { FaDirections, FaInfo, FaLayerGroup, FaPlus } from "react-icons/fa";

export const MenuBar = () => {
  return (
    <div className="menu-bar">
      <button className="btn btn-success menu-bar-round-button">
        <FaLayerGroup size={"2em"} />
      </button>
      <button className="btn btn-success menu-bar-round-button">
        <FaPlus size={"2em"} />
      </button>
      <button className="btn btn-success menu-bar-round-button">
        <FaInfo size={"1.5em"} />
      </button>
      <button className="btn btn-warning menu-bar-round-button">
        <FaDirections size={"2em"} />
      </button>
    </div>
  );
};
