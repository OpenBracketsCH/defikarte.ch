import { useTranslation } from 'react-i18next';
import iconExternalLinkMiddleGreen from '../../assets/icons/icon-external-link-middle-green.svg';
import iconArrowDownWhite from '../../assets/landingpages/icon-arrow-down-white.svg';
import imageDefikartePortraitChristian from '../../assets/landingpages/projekt/defikarte-portrait-christian.jpg';
import imageDefikarteProjectTeaserEn from '../../assets/landingpages/projekt/defikarte-projekt-teaser-en.jpg';
import iconZitat from '../../assets/landingpages/projekt/icon-zitat.svg';
import imageIllustrationFeaturesEmergencyEn from '../../assets/landingpages/projekt/illustration-features-emergency-en.png';
import imageIllustrationFeaturesFindEn from '../../assets/landingpages/projekt/illustration-features-find-en.png';
import imageOpenBracketLogoWhite from '../../assets/navigation/openbrackets-logo-white.svg';
import { Button } from '../../components/ui/button/Button';
import { ContentWrapper } from '../../components/ui/content-wrapper/ContentWrapper';
import { Hero } from '../../components/ui/hero/Hero';
import { Text } from '../../components/ui/text/Text';
import { useLocalizedAsset } from '../../hooks/useLocalizedAsset';
import { AppAdvertisment } from '../app-advertisment/AppAdvertisment';
import { Footer } from '../footer/Footer';

type InfoCardProps = {
  title: string;
  description: string;
};

export const Project = () => {
  const { t } = useTranslation('static');
  const { a } = useLocalizedAsset();

  const InfoCard = ({ title, description }: InfoCardProps) => (
    <div className="p-8 bg-primary-100-white rounded-2xl h-full">
      <Text variant="primary" size="large" className="font-semibold">
        {title}
      </Text>
      <Text variant="primary" size="regular" weight="light">
        {description}
      </Text>
    </div>
  );

  return (
    <div>
      <Hero
        title={t('SectionProjectTitle')}
        description={[t('SectionProjectContent')]}
        buttonText={t('InformKnow')}
        buttonIcon={iconArrowDownWhite}
        image={a(imageDefikarteProjectTeaserEn)}
      />
      <ContentWrapper
        variant="beige"
        className="py-16 md:py-16 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-6"
      >
        <InfoCard title="15'0000+" description={t('SectionProjectFactOne')} />
        <InfoCard title="2019" description={t('SectionProjectFactTwo')} />
        <InfoCard title="12" description={t('SectionProjectFactThree')} />
        <InfoCard title="50+" description={t('SectionProjectFactFour')} />
      </ContentWrapper>
      <ContentWrapper
        variant="white"
        paddingY="large"
        className="gap-10 xl:gap-16 flex-col lg:flex-row lg:items-start xl:items-center"
      >
        <img src={imageDefikartePortraitChristian} className="rounded-2xl w-[419px]" />
        <div className="w-full flex flex-col justify-center lg:justify-start lg:items-start">
          <img src={iconZitat} className="h-[34px]" />
          <Text size="large" weight="bold" className="pt-8 pb-4 text-center lg:text-start">
            {t('SectionProjectStatementTitle')}
          </Text>
          <Text size="small" className="pb-12 text-center lg:text-start">
            {t('SectionProjectStatementContent')}
          </Text>
          <Text weight="bold" size="small" className="text-center lg:text-start">
            {t('SectionProjectNameFounder')}
          </Text>
          <Text className="text-center lg:text-start">{t('SectionProjectTitleFounder')}</Text>
        </div>
      </ContentWrapper>
      <ContentWrapper variant="beige" paddingY="regular" className="flex-col">
        <Text size="large" weight="bold" className="pb-6 w-full">
          {t('SectionProjectHistoryTitle')}
        </Text>
        <Text className="w-full whitespace-pre-line">{t('SectionProjectHistoryContent')}</Text>
      </ContentWrapper>
      <AppAdvertisment variant="white" />
      <ContentWrapper variant="beige" paddingY="regular" className="flex-col gap-26">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-20">
          <div className="flex justify-center">
            <img src={imageIllustrationFeaturesFindEn} className="w-72 md:w-[380px] lg:w-[460px]" />
          </div>
          <div className="w-auto md:w-[380px] lg:w-auto mx-auto lg:mx-0 flex flex-col justify-center">
            <Text weight="bold" size="large" className="pb-4">
              {t('SectionProjectAppDescriptionOneTitle')}
            </Text>
            <Text size="small">{t('SectionProjectAppDescriptionOneContent')}</Text>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-20">
          <div className="flex justify-center">
            <img
              src={imageIllustrationFeaturesEmergencyEn}
              className="w-72 md:w-[380px] lg:w-[460px]"
            />
          </div>
          <div className="w-auto md:w-[380px] lg:w-auto mx-auto lg:mx-0 flex flex-col justify-center">
            <Text weight="bold" size="large" className="pb-4">
              {t('SectionProjectAppDescriptionTwoTitle')}
            </Text>
            <Text size="small">{t('SectionProjectAppDescriptionTwoContent')}</Text>
          </div>
        </div>
      </ContentWrapper>
      <ContentWrapper variant="green-gradient" className="py-16 md:py-[179px] flex-col">
        <Text variant="tint" size="large" weight="bold" className="pb-8 text-center">
          {t('SectionProjectOpenbracketsTitle')}
        </Text>
        <img src={imageOpenBracketLogoWhite} className="w-[200px] pb-10" />
        <Text variant="white" size="regular" weight="light" center className="pb-10">
          {t('SectionProjectOpenbracketsContent')}
        </Text>
        <Button variant="white" icon={iconExternalLinkMiddleGreen}>
          OpenBrackets.ch
        </Button>
      </ContentWrapper>
      <Footer />
    </div>
  );
};
