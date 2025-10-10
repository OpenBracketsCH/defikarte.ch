import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import logoWhite from '../../../assets/navigation/defikarte-logo.svg';
import { LanguageMenu } from '../language-menu/LanguageMenu';

export const EmbedNavbar = () => {
  const { t } = useTranslation();

  const EmergencyText = () => (
    <div className="leading-[150%]">
      <span className="pe-1.5 text-sm font-medium text-primary-100-white">{t('emergency')}</span>
      <span className="text-xl font-bold text-primary-100-green-02">144</span>
    </div>
  );

  return (
    <>
      <nav
        className={cn(
          'sticky top-0',
          'flex flex-row items-center justify-between bg-primary-100-green-04 py-3 px-4 lg:px-6 text-white h-[52px] lg:h-16 z-50 shadow-green-custom'
        )}
      >
        <div className="flex items-center justify-between w-full">
          <NavLink
            to={window.location.origin}
            className={cn('flex items-center space-x-4')}
            target="__blank"
          >
            <div className="flex items-center space-x-4">
              <img src={logoWhite} alt="defikarte.ch" className=''/>
            </div>
          </NavLink>
        </div>
        <div className="flex items-center gap-6 w-full justify-end">
          <EmergencyText />
          <div className="flex items-center">
            <LanguageMenu variant="dark" />
          </div>
        </div>
      </nav>
    </>
  );
};
