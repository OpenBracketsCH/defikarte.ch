import { FaDirections, FaInfo, FaLayerGroup, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MenuType } from "../Menu";
import "./MenuBar.css";

type Props = {
  toggleMenu: (type: MenuType | null) => void;
  activeMenu: MenuType | null;
};

const getButtonClass = (activeMenu: MenuType | null, type: MenuType) => {
  const baseClass = "btn  menu-bar-round-button";
  let additionalClass;
  switch (type) {
    case MenuType.LAYER:
      additionalClass =
        activeMenu === type ? "btn-outline-success" : "btn-success";
      break;
    case MenuType.ADD:
      additionalClass =
        activeMenu === type ? "btn-outline-success" : "btn-success";
      break;
    case MenuType.ROUTE:
      additionalClass =
        activeMenu === type ? "btn-outline-warning" : "btn-warning";
      break;
    case MenuType.INFO:
      additionalClass = "btn-primary  menu-bar-align-end";
      break;
  }

  return `${baseClass} ${additionalClass}`;
};

const getWrapperClass = (activeMenu: MenuType | null, type: MenuType) => {
  const baseClass = "menu-bar-menu-item";
  let additionalClass;
  switch (type) {
    case MenuType.LAYER:
    case MenuType.ADD:
      additionalClass =
        activeMenu === type ? "menu-bar-active-menu-item-success" : "";
      break;
    case MenuType.ROUTE:
      additionalClass =
        activeMenu === type ? "menu-bar-active-menu-item-warning" : "";
      break;
    case MenuType.INFO:
      break;
  }

  return `${baseClass} ${additionalClass}`;
};

export const MenuBar = (props: Props) => {
  const handleMenuClick = (type: MenuType) => {
    props.toggleMenu(type);
  };

  const menuBarActive = props.activeMenu !== null ? "menu-bar-active" : "";
  return (
    <div className={`menu-bar ${menuBarActive}`}>
      <div className={getWrapperClass(props.activeMenu, MenuType.LAYER)}>
        <button
          className={getButtonClass(props.activeMenu, MenuType.LAYER)}
          onClick={() => handleMenuClick(MenuType.LAYER)}
        >
          <FaLayerGroup size={"2em"} />
        </button>
      </div>
      <div className={getWrapperClass(props.activeMenu, MenuType.ADD)}>
        <button
          className={getButtonClass(props.activeMenu, MenuType.ADD)}
          onClick={() => handleMenuClick(MenuType.ADD)}
        >
          <FaPlus size={"2em"} />
        </button>
      </div>
      <div className={getWrapperClass(props.activeMenu, MenuType.ROUTE)}>
        <button
          className={getButtonClass(props.activeMenu, MenuType.ROUTE)}
          onClick={() => handleMenuClick(MenuType.ROUTE)}
        >
          <FaDirections size={"2em"} />
        </button>
      </div>
      <div className={getWrapperClass(props.activeMenu, MenuType.INFO)}>
        <Link to="/info">
          <button
            className={getButtonClass(props.activeMenu, MenuType.INFO)}
            onClick={() => handleMenuClick(MenuType.INFO)}
          >
            <FaInfo size={"1.5em"} />
          </button>
        </Link>
      </div>
    </div>
  );
};
