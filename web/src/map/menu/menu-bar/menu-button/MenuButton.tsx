import { MenuType } from "../../Menu";
import "./MenuButton.css";
interface Props extends React.PropsWithChildren<any> {
  type: MenuType;
  activeMenu: MenuType | null;
  handleMenuClick: () => void;
}

const getButtonClass = (activeMenu: MenuType | null, type: MenuType) => {
  const baseClass = "btn  menu-button-round-button";
  let additionalClass;
  switch (type) {
    case MenuType.SEARCH:
    case MenuType.LAYER:
    case MenuType.ADD:
      additionalClass =
        activeMenu === type ? "btn-outline-success" : "btn-success";
      break;
    case MenuType.ROUTE:
      additionalClass =
        activeMenu === type ? "btn-outline-warning" : "btn-warning";
      break;
    case MenuType.SETTINGS:
      additionalClass =
        activeMenu === type ? "btn-outline-secondary" : "btn-secondary";
      break;
    case MenuType.INFO:
      additionalClass = "btn-primary  menu-button-align-end";
      break;
  }

  return `${baseClass} ${additionalClass}`;
};

const getWrapperClass = (activeMenu: MenuType | null, type: MenuType) => {
  const baseClass = "menu-button-menu-item";
  let additionalClass;
  switch (type) {
    case MenuType.LAYER:
    case MenuType.SEARCH:
    case MenuType.ADD:
      additionalClass =
        activeMenu === type ? "menu-button-active-menu-item-success" : "";
      break;
    case MenuType.ROUTE:
      additionalClass =
        activeMenu === type ? "menu-button-active-menu-item-warning" : "";
      break;
    case MenuType.SETTINGS:
      additionalClass =
        activeMenu === type ? "menu-button-active-menu-item-secondary" : "";
      break;
    case MenuType.INFO:
      break;
  }

  return `${baseClass} ${additionalClass}`;
};

export const MenuButton = ({
  children,
  type,
  activeMenu,
  handleMenuClick,
}: Props) => {
  return (
    <div className={getWrapperClass(activeMenu, type)}>
      <button
        className={getButtonClass(activeMenu, type)}
        onClick={() => handleMenuClick()}
      >
        {children}
      </button>
    </div>
  );
};
