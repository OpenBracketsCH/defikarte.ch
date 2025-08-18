import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import defikarteLogoQuerGruenNegativRgb from '../../assets/logo/defikarte-logo-quer-gruen-negativ-rgb.svg';
import iconExternalLinkMiddleGreen from '../../assets/navigation/icon-external-link-middle-green.svg';
import lifetectLogoWhite from '../../assets/navigation/lifetec-logo-white.svg';
import openbracketsLogoWhite from '../../assets/navigation/openbrackets-logo-white.svg';
import procamedLogoWhite from '../../assets/navigation/procamed-logo-white.svg';
import { ContentWrapper } from '../../components/ui/content-wrapper/ContentWrapper';
import AppConfiguration from '../../configuration/app.configuration';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <ContentWrapper variant="green" className="pt-20 pb-10 flex-col">
      <div className="w-full pb-20 flex justify-between">
        <div>
          <img
            src={defikarteLogoQuerGruenNegativRgb}
            alt="defikarte.ch"
            className="w-[150px] pb-8"
          />
          <div className="border w-fit pt-3 px-4 pb-4 rounded-lg border-primary-10-white">
            <p className="text-primary-100-green-02 text-xs font-normal leading-[150%] pb-1">
              {t('projectOf')}
            </p>
            <img src={openbracketsLogoWhite} alt="OpenBracktes.ch" />
          </div>
        </div>
        <div className="w-1/2 grid grid-cols-3 grid-flow-col grid-rows-3 gap-3">
          <a
            href="/"
            className="text-primary-100-white font-normal leading-[150%] text-sm cursor-pointer"
          >
            defikarte.ch
          </a>
          {AppConfiguration.routes
            .filter(r => r.key !== 'home')
            .map(r => (
              <NavLink
                key={r.key}
                to={r.route}
                className="text-primary-100-white font-normal leading-[150%] text-sm cursor-pointer"
              >
                {t(r.key)}
              </NavLink>
            ))}
          <NavLink
            key="legal"
            to="legal"
            className="text-primary-100-white font-normal leading-[150%] text-sm cursor-pointer"
          >
            {t('legal')}
          </NavLink>
          <NavLink
            key="dataPrivacy"
            to="dataPrivacy"
            className="text-primary-100-white font-normal leading-[150%] text-sm cursor-pointer"
          >
            {t('dataPrivacy')}
          </NavLink>
          <a
            href="https://github.com/OpenBracketsCH/defikarte.ch"
            target="__blank"
            className="flex text-primary-100-white font-normal leading-[150%] text-sm cursor-pointer h-fit"
          >
            GitHub
            <img src={iconExternalLinkMiddleGreen} className="ps-1" />
          </a>
          <a
            href="https://www.openbrackets.ch/"
            target="__blank"
            className="flex text-primary-100-white font-normal leading-[150%] text-sm cursor-pointer h-fit"
          >
            OpenBrackets
            <img src={iconExternalLinkMiddleGreen} className="ps-1" />
          </a>
        </div>
      </div>
      <div className="w-full flex items-center gap-6">
        <p className="text-[8px] text-primary-100-white leading-[150%] me-auto">
          © {new Date().getFullYear()} defikarte.ch
        </p>
        <p className="text-xs text-primary-100-white leading-[150%]">{t('supportedBy')}</p>
        <img src={procamedLogoWhite} alt="procamed" className="h-[25px]" />
        <img src={lifetectLogoWhite} alt="lifetec one" className="h-[25px]" />
      </div>
    </ContentWrapper>
  );
};
