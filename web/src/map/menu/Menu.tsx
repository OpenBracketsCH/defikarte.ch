import { useCallback, useState } from "react";
import "./Menu.css";
import { LayerMenu } from "./layer-menu/LayerMenu";
import { MenuBar } from "./menu-bar/MenuBar";

export enum MenuType {
  LAYER,
  ADD,
  ROUTE,
  INFO,
}

export type SubMenuProps = {
  hidden: boolean;
  closeAction: () => void;
};

export const Menu = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType | null>(null);

  const handleMenuClick = useCallback(
    (type: MenuType | null) => {
      if (activeMenu === type) {
        setActiveMenu(null);
      } else {
        setActiveMenu(type);
      }
    },
    [activeMenu]
  );

  return (
    <div>
      <MenuBar toggleMenu={(t) => handleMenuClick(t)} activeMenu={activeMenu} />
      <div className="menu-sidecar" hidden={activeMenu === null}>
        <LayerMenu
          hidden={activeMenu !== MenuType.LAYER}
          closeAction={() => setActiveMenu(null)}
        />
      </div>
    </div>
  );
};
