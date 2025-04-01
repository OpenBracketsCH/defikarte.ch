import { useTranslation } from 'react-i18next';
import iconCloseDarkGreen from '../../../../assets/icons/icon-close-dark-green.svg';
import iconEditDarkGreen from '../../../../assets/icons/icon-edit-dark-green.svg';
import iconNavigationWhite from '../../../../assets/icons/icon-navigation-white.svg';
import { Button } from '../../../../components/ui/button/Button';
import { IconButton } from '../../../../components/ui/icon-button/IconButton';
import { Tag } from '../../../../components/ui/tag/Tag';

export const DetailView = () => {
  const { t } = useTranslation();
  return (
    <div
      className="absolute bottom-16 right-6 flex flex-col items-start justify-between w-[300px] h-[500px] bg-primary-100-white rounded-2xl shadow-lg shadow-green-shadow-64"
      style={{ zIndex: 100000 }}
    >
      <div className="px-4 py-3 flex justify-between w-full items-start border-b border-primary-05-green-05">
        <p className="text-wrap text-sm font-normal leading-[150%] text-primary-100-green-04">
          aed name aed name aed name aed name aed name
        </p>
        <IconButton icon={iconCloseDarkGreen} variant="white" />
      </div>
      <div className="h-full p-4">
        <div className="flex flex-wrap items-start justify-start gap-1.5">
          <Tag variant="primary" icon={iconEditDarkGreen}>
            Test Primary
          </Tag>
          <Tag variant="tint" icon={iconEditDarkGreen}>
            Test Tint
          </Tag>
          <Tag variant="secondary" icon={iconEditDarkGreen}>
            Test Secondary
          </Tag>
          <Tag variant="orange" icon={iconEditDarkGreen}>
            Test Orange
          </Tag>
        </div>
        <p>content</p>
      </div>
      <div className="pb-4 px-4 flex justify-between w-full">
        <Button variant="primary" icon={iconNavigationWhite}>
          {t('navigate')}
        </Button>
        <IconButton icon={iconEditDarkGreen} variant="tint" />
      </div>
    </div>
  );
};
