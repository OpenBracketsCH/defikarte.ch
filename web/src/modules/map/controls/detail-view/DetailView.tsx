import { Button } from '../../../../components/ui/button/Button';
import iconNavigationWhite from '../../../../assets/icons/icon-navigation-white.svg';
import { useTranslation } from 'react-i18next';

export const DetailView = () => {
  const { t } = useTranslation();
  return (
    <div
      className="absolute bottom-16 right-6 flex flex-col items-start justify-between w-[300px] h-[500px] bg-primary-100-white rounded-2xl shadow-lg shadow-green-shadow-64"
      style={{ zIndex: 100000 }}
    >
      <div>
        <p>header</p>
      </div>
      <div>
        <p>content</p>
      </div>
      <div className="pb-4 px-4 flex justify-between w-full">
        <Button variant="primary" icon={iconNavigationWhite}>
          {t('start')}
        </Button>
        <Button variant="primary">{t('edit')}</Button>
      </div>
    </div>
  );
};
