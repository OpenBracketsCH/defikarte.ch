import { useCallback, useState } from 'react';
import './Menu.css';
import { AddMenu } from './add-menu/AddMenu';
import { LayerMenu } from './layer-menu/LayerMenu';
import { MenuBar } from './menu-bar/MenuBar';
import { LayerId } from '../../../model/map';

export enum MenuType {
  LAYER,
  ADD,
  ROUTE,
  INFO,
  SEARCH,
  SETTINGS,
}

export interface SubMenuProps {
  hidden: boolean;
  closeAction?: () => void;
}

type Props = {
  enabledLayers: LayerId[];
  setLayerVisible: (layer: LayerId, visible: boolean) => void;
};

export const Menu = (props: Props) => {
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
      <MenuBar toggleMenu={t => handleMenuClick(t)} activeMenu={activeMenu} />
      <div className="menu-sidecar mobile" hidden={activeMenu === null}>
        <LayerMenu
          enabledLayers={props.enabledLayers}
          setLayerVisible={props.setLayerVisible}
          hidden={activeMenu !== MenuType.LAYER}
          closeAction={() => setActiveMenu(null)}
        />
        <AddMenu hidden={activeMenu !== MenuType.ADD} closeAction={() => setActiveMenu(null)} />
      </div>
    </div>
  );
};
