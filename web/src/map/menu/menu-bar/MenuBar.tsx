import {
  FaDirections,
  FaInfo,
  FaLayerGroup,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { FaSliders } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MenuType } from "../Menu";
import "./MenuBar.css";
import { MenuButton } from "./menu-button/MenuButton";

type Props = {
  toggleMenu: (type: MenuType | null) => void;
  activeMenu: MenuType | null;
};

const getMenurBarClass = (activeMenu: MenuType | null) => {
  const baseClass = "menu-bar";
  let additionalClass;
  switch (activeMenu) {
    case MenuType.SEARCH:
    case MenuType.LAYER:
    case MenuType.ADD:
      additionalClass = "menu-bar-active-success";
      break;
    case MenuType.ROUTE:
      additionalClass = "menu-bar-active-warning";
      break;
    case MenuType.SETTINGS:
      additionalClass = "menu-bar-active-secondary";
      break;
    case MenuType.INFO:
    default:
      break;
  }

  return `${baseClass} ${additionalClass}`;
};

export const MenuBar = (props: Props) => {
  const handleMenuClick = (type: MenuType) => {
    props.toggleMenu(type);
  };

  const menuBarClass = getMenurBarClass(props.activeMenu);
  return (
    <div className={menuBarClass}>
      <MenuButton
        handleMenuClick={() => handleMenuClick(MenuType.SEARCH)}
        activeMenu={props.activeMenu}
        type={MenuType.SEARCH}
      >
        <FaSearch size={"2em"} />
      </MenuButton>
      <MenuButton
        handleMenuClick={() => handleMenuClick(MenuType.LAYER)}
        activeMenu={props.activeMenu}
        type={MenuType.LAYER}
      >
        <FaLayerGroup size={"2em"} />
      </MenuButton>
      <MenuButton
        handleMenuClick={() => handleMenuClick(MenuType.ADD)}
        activeMenu={props.activeMenu}
        type={MenuType.ADD}
      >
        <FaPlus size={"2em"} />
      </MenuButton>
      <MenuButton
        handleMenuClick={() => handleMenuClick(MenuType.ROUTE)}
        activeMenu={props.activeMenu}
        type={MenuType.ROUTE}
      >
        <FaDirections size={"2em"} />
      </MenuButton>
      <MenuButton
        handleMenuClick={() => handleMenuClick(MenuType.SETTINGS)}
        activeMenu={props.activeMenu}
        type={MenuType.SETTINGS}
      >
        <FaSliders size={"2em"} />
      </MenuButton>
      <Link to="/info">
        <MenuButton
          handleMenuClick={() => handleMenuClick(MenuType.INFO)}
          activeMenu={props.activeMenu}
          type={MenuType.INFO}
        >
          <FaInfo size={"1.5em"} />
        </MenuButton>
      </Link>
    </div>
  );
};
