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
    <ContentWrapper variant="green-gradient" className="pb-0 pt-0">
      <div>
        <Text size="large" variant="tint" weight="bold" className="pb-8">
          {t('SectionAppTitle')}
        </Text>
        <Text size="small" variant="white" weight="regular">
          {t('SectionAppContent')}
        </Text>
        <div className="flex flex-row gap-4 pt-10">
          <img src={appStoreImage} />
          <img src={googlePlayStoreImage} />
        </div>
      </div>
      <img src={a(appScreenShadowEn)} className="max-w-[570px]" />
    </ContentWrapper>
  );
};
