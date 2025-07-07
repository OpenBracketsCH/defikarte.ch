import cn from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import iconCloseDarkGreen from '../../assets/icons/icon-close-middle-green.svg';
import logoWhite from '../../assets/navigation/defikarte-logo.svg';
import lifetecLogoWhite from '../../assets/navigation/lifetec-logo-white.svg';
import procamedLogoWhite from '../../assets/navigation/procamed-logo-white.svg';

export const Navbar = () => {
  const { t } = useTranslation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const routes = ['home', 'knowledge', 'project', 'support'].map(key => {
    return { key: key, route: key === 'home' ? '/' : `/${key}` };
  });

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
          'flex flex-col lg:flex-row items-center justify-between bg-primary-100-green-04 py-3 px-4 lg:px-6 text-white',
          {
            'z-40 absolute flex-col top-0 left-0 right-0 bottom-0 bg-primary-100-green-04 justify-start':
              isMobileOpen,
          }
        )}
      >
        <div className="flex items-center justify-between w-full lg:w-auto">
          <NavLink to={'/'} className={cn('flex items-center space-x-4', { hidden: isMobileOpen })}>
            <div className="flex items-center space-x-4">
              <img src={logoWhite} alt="defikarte.ch" className="" />
            </div>
          </NavLink>
          <button
            onClick={() => setIsMobileOpen(true)}
            className={cn(
              'lg:hidden border-t-2 border-b-2 border-primary-100-white h-2 w-5 cursor-pointer',
              { hidden: isMobileOpen }
            )}
          ></button>
        </div>
        <div
          className={cn('z-50 lg:hidden flex justify-between w-full', {
            hidden: !isMobileOpen,
          })}
        >
          <EmergencyText />
          <button onClick={() => setIsMobileOpen(false)}>
            <img src={iconCloseDarkGreen} alt="close" />
          </button>
        </div>
        <div
          className={cn('lg:flex', 'lg:top-auto lg:right-auto lg:left-auto lg:bottom-auto', {
            hidden: !isMobileOpen,
            'flex flex-col w-[100%] pt-14 pb-10 px-6 grow': isMobileOpen,
          })}
        >
          <div className="flex justify-end pb-10">
            <p className={cn('z-40', { hidden: !isMobileOpen })}>language mobile</p>
          </div>
          <ul
            className={cn(
              'lg:flex flex-col lg:flex-row lg:gap-8 leading-[150%] py-2 text-primary-100-white',
              {
                'flex justify-start w-full': isMobileOpen,
              }
            )}
          >
            {routes.map(r => (
              <NavLink
                onClick={() => setIsMobileOpen(false)}
                key={r.key}
                to={r.route}
                className={({ isActive }) =>
                  cn(
                    'text-base',
                    'lg:text-sm',
                    'font-medium',
                    'py-10',
                    'lg:p-0',
                    'lg:m-0',
                    'border-t',
                    'last:border-b',
                    'lg:border-0',
                    'lg:last:border-0',
                    'border-primary-10-white',
                    {
                      'text-primary-100-green-02': isActive,
                    }
                  )
                }
              >
                {t(r.key)}
              </NavLink>
            ))}
          </ul>
          <div className="flex lg:hidden grow flex-col gap-4 justify-end ">
            <p className="text-xs font-medium leading-[150%] text-primary-100-green-02">
              {t('supportedBy')}
            </p>
            <div className="flex gap-8">
              <img src={procamedLogoWhite} alt="procamed" className="h-6" />
              <img src={lifetecLogoWhite} alt="lifetec one" className="h-6" />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          <EmergencyText />
          <div className="flex items-center">
            <span>{t('language')}</span>
          </div>
        </div>
      </nav>
    </>
  );
};
