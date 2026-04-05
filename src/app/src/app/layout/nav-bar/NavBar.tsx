import { useTranslation } from 'react-i18next';
import iconInfoGreen from '../../../assets/icons/icon-info-green.svg';
import iconInfoWhite from '../../../assets/icons/icon-info-white.svg';
import iconMarkerGreen from '../../../assets/icons/icon-marker-green.svg';
import iconMarkerWhite from '../../../assets/icons/icon-marker-white.svg';
import iconPlusGreen from '../../../assets/icons/icon-plus-green.svg';
import iconPlusWhite from '../../../assets/icons/icon-plus-white.svg';
import iconSettingsGreen from '../../../assets/icons/icon-settings-green.svg';
import iconSettingsWhite from '../../../assets/icons/icon-settings-white.svg';
import { IconLink } from './icon-link/IconLink';

export const NavBar = () => {
  const { t } = useTranslation();
  const activeClassName = 'text-primary-100-green-02';

  return (
    <div className="flex justify-center px-4 py-1.5 bg-primary-100-green-04 text-primary-100-white">
      <div className="flex w-full">
        <IconLink
          to="/"
          iconSrc={iconMarkerWhite}
          activeProps={{ className: activeClassName, iconSrc: iconMarkerGreen }}
        >
          {t('nav.home')}
        </IconLink>
        <IconLink
          to="/create"
          iconSrc={iconPlusWhite}
          activeProps={{ className: activeClassName, iconSrc: iconPlusGreen }}
        >
          {t('nav.create')}
        </IconLink>
        <IconLink
          to="/settings"
          iconSrc={iconSettingsWhite}
          activeProps={{ className: activeClassName, iconSrc: iconSettingsGreen }}
        >
          {t('nav.settings')}
        </IconLink>
        <IconLink
          to="/about"
          iconSrc={iconInfoWhite}
          activeProps={{ className: activeClassName, iconSrc: iconInfoGreen }}
        >
          {t('nav.about')}
        </IconLink>
      </div>
    </div>
  );
};
