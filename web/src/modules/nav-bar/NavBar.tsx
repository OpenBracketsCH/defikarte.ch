import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import logoWhite from '../../assets/logo/defikarte-logo.svg';

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="flex items-center justify-between bg-primary-100-green-04 py-3 px-6 text-white">
      <div className="flex items-center space-x-4">
        <img src={logoWhite} alt="defikarte.ch" />
      </div>
      <ul className="flex space-x-8 leading-[150%] py-2 text-primary-100-white">
        {['home', 'knowledge', 'project', 'support'].map(key => (
          <NavLink
            key={key}
            to={`/${key}`}
            className={({ isActive }) =>
              cn('text-sm font-medium', {
                'text-primary-100-green-02': isActive,
              })
            }
          >
            {t(key)}
          </NavLink>
        ))}
      </ul>
      <div className="flex items-center">
        <div className="leading-[150%] pe-6">
          <span className="pe-1.5 text-sm font-medium text-primary-100-white">
            {t('emergency')}
          </span>
          <span className="text-xl font-bold text-primary-100-green-02">144</span>
        </div>
        <div className="flex items-center">
          <span>{t('language')}</span>
        </div>
      </div>
    </nav>
  );
};
