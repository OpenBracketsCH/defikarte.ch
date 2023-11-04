import IconButton from '../../../../../components/buttons/icon-button/IconButton';
import { MenuType } from '../../Menu';
import './MenuButton.css';

interface Props extends React.PropsWithChildren<any> {
  type: MenuType;
  activeMenu: MenuType | null;
  handleMenuClick: () => void;
}

export const MenuButton = ({ children, type, activeMenu, handleMenuClick }: Props) => {
  return (
    <div className="menu-button-menu-item">
      <IconButton toggle selected={type === activeMenu} onClick={() => handleMenuClick()}>
        {children}
      </IconButton>
    </div>
  );
};
