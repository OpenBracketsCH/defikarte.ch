import { FaDirections, FaInfo, FaLayerGroup, FaPlus, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MenuType } from '../Menu';
import './MenuBar.css';
import { MenuButton } from './menu-button/MenuButton';

type Props = {
  toggleMenu: (type: MenuType | null) => void;
  activeMenu: MenuType | null;
};

export const MenuBar = (props: Props) => {
  const handleMenuClick = (type: MenuType) => {
    props.toggleMenu(type);
  };

  return (
    <div className="menu-bar">
      <MenuButton
        handleMenuClick={() => handleMenuClick(MenuType.SEARCH)}
        activeMenu={props.activeMenu}
        type={MenuType.SEARCH}
      >
        <FaSearch />
      </MenuButton>
      <MenuButton
        handleMenuClick={() => handleMenuClick(MenuType.LAYER)}
        activeMenu={props.activeMenu}
        type={MenuType.LAYER}
      >
        <FaLayerGroup />
      </MenuButton>
      <MenuButton
        handleMenuClick={() => handleMenuClick(MenuType.ADD)}
        activeMenu={props.activeMenu}
        type={MenuType.ADD}
      >
        <FaPlus />
      </MenuButton>
      <MenuButton
        handleMenuClick={() => handleMenuClick(MenuType.ROUTE)}
        activeMenu={props.activeMenu}
        type={MenuType.ROUTE}
      >
        <FaDirections />
      </MenuButton>
      <Link to="/info">
        <MenuButton
          handleMenuClick={() => handleMenuClick(MenuType.INFO)}
          activeMenu={props.activeMenu}
          type={MenuType.INFO}
        >
          <FaInfo />
        </MenuButton>
      </Link>
    </div>
  );
};
