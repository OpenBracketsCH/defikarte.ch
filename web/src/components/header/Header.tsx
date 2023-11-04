import { useTranslation } from 'react-i18next';
import lifetecLogo from '../../assets/lifetec.png';
import logo from '../../assets/logo.png';
import procamedLogo from '../../assets/procamed.jpg';
import './Header.css';

export const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="header-header mobile">
      <div className="header-group">
        <a href="/">
          <img src={logo} alt="Defikarte.ch" className="header-image" />
        </a>
        <p className="header-text">{t('defikarte_titel')}</p>
      </div>
      <div className="header-group header-group-collapsed">
        <p className="header-text header-text-sm">{t('in_partnership_with')}</p>
        <a href="https://www.aed.ch">
          <img src={procamedLogo} alt="procamed" width={'100px'} className="header-image" />
        </a>
        <a href="https://www.lifetec.ch">
          <img src={lifetecLogo} alt="lifetec" width={'100px'} className="header-image" />
        </a>
      </div>
    </header>
  );
};
