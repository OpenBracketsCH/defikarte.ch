import { useTranslation } from 'react-i18next';
import appStoreImage from '../../assets/landingpages/apple-app-store-white-de.svg';
import googlePlayStoreImage from '../../assets/landingpages/google-play-store-white-de.svg';
import appScreenShadowEn from '../../assets/landingpages/home/app-screen-shadow-en.png';
import { ContentWrapper } from '../../components/ui/content-wrapper/ContentWrapper';
import { Text } from '../../components/ui/text/Text';
import { useLocalizedAsset } from '../../hooks/useLocalizedAsset';

export const AppAdvertisment = () => {
  const { t } = useTranslation('static');
  const { a } = useLocalizedAsset();

  return (
    <ContentWrapper
      variant="green-gradient"
      paddingY="regular"
      className="pb-0 md:pb-0 xl:pt-0 flex-col xl:flex-row"
    >
      <div>
        <Text size="large" variant="tint" weight="bold" className="pb-8 text-center xl:text-left">
          {t('SectionAppTitle')}
        </Text>
        <Text size="small" variant="white" weight="regular" className="text-center xl:text-left">
          {t('SectionAppContent')}
        </Text>
        <div className="flex flex-row gap-2 md:gap-4 pt-10 justify-center xl:justify-start">
          <img src={appStoreImage} className="h-8 md:h-auto" />
          <img src={googlePlayStoreImage} className="h-8 md:h-auto" />
        </div>
      </div>
      <img src={a(appScreenShadowEn)} className="max-w-[307px] md:max-w-[469px] xl:max-w-[570px]" />
    </ContentWrapper>
  );
};
