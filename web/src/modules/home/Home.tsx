import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import illustrationFeaturesCaptureEn from '../../assets/landingpages/home/illustration-features-capture-en.png';
import illustrationFeaturesCorrectEn from '../../assets/landingpages/home/illustration-features-correct-en.png';
import illustrationFeaturesFastEn from '../../assets/landingpages/home/illustration-features-fast-en.png';
import { Accordion } from '../../components/ui/accordion/Accordion';
import { ContentWrapper } from '../../components/ui/content-wrapper/ContentWrapper';
import { Text } from '../../components/ui/text/Text';
import { useLocalizedAsset } from '../../hooks/useLocalizedAsset';
import { AppAdvertisment } from '../app-advertisment/AppAdvertisment';
import { Footer } from '../footer/Footer';
import { Map } from '../map/Map';
import { MapFooter } from './map-footer/MapFooter';

export const Home = () => {
  const { t } = useTranslation('static');
  const { a } = useLocalizedAsset();
  const firstViewRef = useRef<HTMLDivElement>(null);

  const handleNextViewClick = () => {
    if (firstViewRef.current) {
      firstViewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="h-[calc(100vh-(52px))] lg:h-[calc(100vh-(--spacing(16)))] w-full flex flex-col overflow-hidden">
        <Map />
        <MapFooter onNextViewClick={handleNextViewClick} />
      </div>
      <div ref={firstViewRef}>
        <ContentWrapper paddingY="small" className="flex-col gap-6 pb-28" variant="beige">
          <Text size="x-large" weight="bold" center>
            {t('SectionHomeTitle')}
          </Text>
          <Text size="regular" weight="light" center>
            {t('SectionHomeContent')}
          </Text>
          <div className="pt-20 flex w-full justify-between">
            <div className="w-[300px]">
              <img src={a(illustrationFeaturesFastEn)} />
              <Text size="medium" weight="bold" className="pt-10 pb-4">
                {t('SectionHomeClaimOneTitle')}
              </Text>
              <Text size="small" weight="regular">
                {t('SectionHomeClaimOneContent')}
              </Text>
            </div>
            <div className="w-[300px]">
              <img src={a(illustrationFeaturesCorrectEn)} />
              <Text size="medium" weight="bold" className="pt-10 pb-4">
                {t('SectionHomeClaimTwoTitle')}
              </Text>
              <Text size="small" weight="regular">
                {t('SectionHomeClaimTwoContent')}
              </Text>
            </div>
            <div className="w-[300px]">
              <img src={a(illustrationFeaturesCaptureEn)} />
              <Text size="medium" weight="bold" className="pt-10 pb-4">
                {t('SectionHomeClaimThreeTitle')}
              </Text>
              <Text size="small" weight="regular">
                {t('SectionHomeClaimThreeContent')}
              </Text>
            </div>
          </div>
        </ContentWrapper>
        <AppAdvertisment />
        <ContentWrapper className="flex-col" variant="beige" paddingY="regular">
          <Text size="x-large" weight="bold" className="pb-4">
            {t('SectionFAQTitle')}
          </Text>
          <Text>{t('SectionFAQContent')}</Text>
          <div className="pt-12 w-[100%] flex flex-col gap-2">
            <Accordion title={t('SectionFAQQuestionOne')} content={t('SectionFAQAnswerOne')} />
            <Accordion title={t('SectionFAQQuestionTwo')} content={t('SectionFAQAnswerTwo')} />
            <Accordion title={t('SectionFAQQuestionThree')} content={t('SectionFAQAnswerThree')} />
            <Accordion title={t('SectionFAQQuestionFour')} content={t('SectionFAQAnswerFour')} />
            <Accordion title={t('SectionFAQQuestionFive')} content={t('SectionFAQAnswerFive')} />
          </div>
        </ContentWrapper>
        <Footer />
      </div>
    </>
  );
};
