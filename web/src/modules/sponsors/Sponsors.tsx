import { useTranslation } from 'react-i18next';
import iconExternalLinkMiddleGreen from '../../assets/icons/icon-external-link-middle-green.svg';
import iconArrowDownWhite from '../../assets/landingpages/icon-arrow-down-white.svg';
import iconEmailWhite from '../../assets/landingpages/icon-email-white.svg';
import iconExternalLinkWhite from '../../assets/landingpages/icon-external-link-white.svg';
import imageDefikartePartnerByteworks from '../../assets/landingpages/unterstuetzung/defikarte-partner-byteworks.svg';
import imageDefikartePartnerFirstResponder from '../../assets/landingpages/unterstuetzung/defikarte-partner-first-responder.jpg';
import imageDefikartePartnerFurrer from '../../assets/landingpages/unterstuetzung/defikarte-partner-furrer.jpg';
import imageDefikartePartnerHexagon from '../../assets/landingpages/unterstuetzung/defikarte-partner-hexagon.svg';
import imageDefikartePartnerHostpoint from '../../assets/landingpages/unterstuetzung/defikarte-partner-hostpoint.svg';
import imageDefikartePartnerKtsg from '../../assets/landingpages/unterstuetzung/defikarte-partner-ktsg.svg';
import imageDefikartePartnerLifetec from '../../assets/landingpages/unterstuetzung/defikarte-partner-lifetec.svg';
import imageDefikartePartnerProcamed from '../../assets/landingpages/unterstuetzung/defikarte-partner-procamed.svg';
import imageDefikartePartnerResqpro from '../../assets/landingpages/unterstuetzung/defikarte-partner-resqpro.jpg';
import imageDefikartePartnerSinoma from '../../assets/landingpages/unterstuetzung/defikarte-partner-sinoma.jpg';
import imageDefikartePartnerSirmed from '../../assets/landingpages/unterstuetzung/defikarte-partner-sirmed.svg';
import imageDefikartePartnerSusv from '../../assets/landingpages/unterstuetzung/defikarte-partner-susv.svg';
import imageDefikarteUnterstuetzungTeaser from '../../assets/landingpages/unterstuetzung/defikarte-unterstuetzung-teaser.jpg';
import imageDefikarteUnterstuezungTwintEn from '../../assets/landingpages/unterstuetzung/defikarte-unterstuetzung-twint-en.png';
import imageDefikarteSackmesser from '../../assets/landingpages/wissen/defikarte-sackmesser.jpg';
import { Button } from '../../components/ui/button/Button';
import { ContentWrapper } from '../../components/ui/content-wrapper/ContentWrapper';
import { Hero } from '../../components/ui/hero/Hero';
import { IconButton } from '../../components/ui/icon-button/IconButton';
import { Text } from '../../components/ui/text/Text';
import { useLocalizedAsset } from '../../hooks/useLocalizedAsset';
import { AppAdvertisment } from '../app-advertisment/AppAdvertisment';
import { Footer } from '../footer/Footer';
import { SponsorCard } from './sponsor-card/SponsorCard';

export const Sponsors = () => {
  const { t } = useTranslation('static');
  const { a } = useLocalizedAsset();

  return (
    <div>
      <Hero
        title={t('SectionSponsorsTitle')}
        description={t('SectionSponsorsContent')}
        image={imageDefikarteUnterstuetzungTeaser}
        buttonText={t('InformKnow')}
        buttonIcon={iconArrowDownWhite}
      />
      <ContentWrapper paddingY="regular" variant="white" className="flex-col break-words">
        <Text className="pb-6" variant="primary" size="large" weight="bold" center>
          {t('SectionSponsorsSearchTitle')}
        </Text>
        <Text className="pb-8 whitespace-pre-line" center variant="primary" size="regular">
          {t('SectionSponsorsSearchContent')}
        </Text>
        <Button icon={iconEmailWhite} size="large">
          sponsoring@defikarte.ch
        </Button>
      </ContentWrapper>
      <ContentWrapper variant="beige" paddingY="regular" className="flex-col gap-28 pb-16 md:pb-32">
        <div className="w-full md:w-95 lg:w-auto flex flex-col lg:flex-row gap-10 xl:gap-20 items-center justify-center">
          <img className="rounded-2xl md:w-95 xl:w-115" src={imageDefikarteSackmesser} />
          <div className="w-full">
            <Text size="large" weight="bold" className="pb-4">
              {t('SectionSponsorsKnifeTitle')}
            </Text>
            <Text size="regular" className="pb-8">
              {t('SectionSponsorsKnifeContent')}
            </Text>
            <Button icon={iconExternalLinkWhite} size="large">
              {t('Order')}
            </Button>
          </div>
        </div>
        <div className="md:w-95 lg:w-auto flex flex-col lg:flex-row gap-10 xl:gap-20 items-center justify-center">
          <img
            className="rounded-2xl md:w-95 xl:w-115"
            src={a(imageDefikarteUnterstuezungTwintEn)}
          />
          <div>
            <Text size="large" weight="bold" className="pb-4">
              {t('SectionSponsorsTwintTitle')}
            </Text>
            <Text size="regular" className="pb-8">
              {t('SectionSponsorsTwintContent')}
            </Text>
            <button className="bg-primary-100-black text-primary-100-white py-3 px-4 rounded-2xl font-semibold cursor-pointer break-words">
              Mit TWINT bezahlen
            </button>
          </div>
        </div>
      </ContentWrapper>
      <ContentWrapper paddingY="regular" variant="green-gradient" className="flex-col">
        <Text variant="tint" size="large" weight="bold" className="pb-6" center>
          {t('SectionSponsorsPlatinTitle')}
        </Text>
        <Text variant="white" size="regular" center className="pb-20">
          {t('SectionSponsorsPlatinContent')}
        </Text>
        <div className="flex flex-col lg:flex-row w-full gap-9">
          <div className="bg-beige rounded-2xl lg:w-1/2 flex flex-col h-112">
            <div className="bg-primary-100-white rounded-t-2xl flex justify-center items-center grow-1">
              <img src={imageDefikartePartnerProcamed} className="w-[230px]" />
            </div>
            <div className="p-8">
              <Text size="medium" weight="bold" className="pb-3">
                Procamed AG
              </Text>
              <div className="flex flex-row gap-9 items-end">
                <Text>{t('ClaimSponsorsProcamed')}</Text>
                <IconButton size="large" variant="white" icon={iconExternalLinkMiddleGreen} />
              </div>
            </div>
          </div>
          <div className="bg-beige rounded-2xl lg:w-1/2 flex flex-col h-112">
            <div className="bg-primary-100-white rounded-t-2xl flex justify-center items-center grow-1">
              <img src={imageDefikartePartnerLifetec} className="w-[230px]" />
            </div>
            <div className="p-8">
              <Text size="medium" weight="bold" className="pb-3">
                Lifetec AG
              </Text>
              <div className="flex flex-row gap-9 items-end">
                <Text>{t('ClaimSponsorsLifetec')}</Text>
                <IconButton size="large" variant="white" icon={iconExternalLinkMiddleGreen} />
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
      <ContentWrapper variant="beige" paddingY="regular" className="flex-col">
        <Text size="large" weight="bold" className="pb-16">
          {t('SectionSponsorsGold')}
        </Text>
        <div className="flex gap-9 justify-center flex-wrap">
          <SponsorCard src={imageDefikartePartnerResqpro} href="" />
          <SponsorCard src={imageDefikartePartnerByteworks} href="" />
          <SponsorCard src={imageDefikartePartnerFirstResponder} href="" />
          <SponsorCard src={imageDefikartePartnerSirmed} href="" />
          <SponsorCard src={imageDefikartePartnerFurrer} href="" />
          <SponsorCard src={imageDefikartePartnerSinoma} href="" />
          <SponsorCard src={imageDefikartePartnerKtsg} href="" />
        </div>
        <Text size="large" weight="bold" className="pt-32 pb-16">
          {t('SectionSponsorsSilver')}
        </Text>
        <div className="flex gap-9 justify-center flex-wrap">
          <SponsorCard src={imageDefikartePartnerHexagon} href="" />
          <SponsorCard src={imageDefikartePartnerHostpoint} href="" />
          <SponsorCard src={imageDefikartePartnerSusv} href="" />
        </div>
      </ContentWrapper>
      <AppAdvertisment />
      <Footer />
    </div>
  );
};
