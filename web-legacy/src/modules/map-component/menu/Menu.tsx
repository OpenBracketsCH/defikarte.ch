import { useCallback, useState } from 'react';
import './Menu.css';
import { AddMenu } from './form-menu/FormMenu';
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
  hidden: boolean;
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
    <>
      <MenuBar toggleMenu={t => handleMenuClick(t)} activeMenu={activeMenu} hidden={props.hidden} />
      <div className={`menu-sidecar mobile ${activeMenu === null ? 'hidden' : ''}`}>
        <LayerMenu
          enabledLayers={props.enabledLayers}
          setLayerVisible={props.setLayerVisible}
          hidden={activeMenu !== MenuType.LAYER}
          closeAction={() => setActiveMenu(null)}
        />
        <AddMenu hidden={activeMenu !== MenuType.ADD} closeAction={() => setActiveMenu(null)} />
      </div>
    </>
  );
};
