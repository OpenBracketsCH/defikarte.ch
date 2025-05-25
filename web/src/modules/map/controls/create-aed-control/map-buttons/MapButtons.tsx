import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import iconCheckWhite from '../../../../../assets/icons/icon-check-white.svg';
import iconCloseDarkGreen from '../../../../../assets/icons/icon-close-dark-green.svg';
import iconCloseMiddleGreen from '../../../../../assets/icons/icon-close-middle-green.svg';
import { Button } from '../../../../../components/ui/button/Button';
import { CreateMode } from '../../../../../model/map';

type MapButtonProps = {
  createMode: CreateMode;
  handleCancel: () => void;
  handleConfirmation: () => void;
};

export const MapButtons = ({ createMode, handleCancel, handleConfirmation }: MapButtonProps) => {
  const { t } = useTranslation();

  const buttonContainerClass = cn(
    'absolute',
    'bottom-6',
    'z-[100000]',
    'w-full',
    'flex',
    'flex-row',
    'items-end',
    'h-0',
    {
      'justify-center': createMode === CreateMode.position,
      'justify-center md:justify-start md:ps-6': createMode === CreateMode.form,
    }
  );

  return (
    <>
     
      <div className={buttonContainerClass}>
        <div className="flex-row justify-center items-end gap-2 flex">
          <Button
            variant="primary"
            size="large"
            icon={iconCheckWhite}
            onClick={handleConfirmation}
            iconOnly
            className="md:hidden"
          />
          <Button
            variant="primary"
            size="large"
            icon={iconCheckWhite}
            onClick={handleConfirmation}
            className="hidden md:flex"
          >
            {t('confirmPosition')}
          </Button>
          <Button
            variant="white"
            size="large"
            icon={iconCloseMiddleGreen}
            iconHover={iconCloseDarkGreen}
            onClick={handleCancel}
            iconOnly
            className="md:hidden"
          />
          <Button
            variant="white"
            size="large"
            icon={iconCloseMiddleGreen}
            iconHover={iconCloseDarkGreen}
            onClick={handleCancel}
            className="hidden md:flex"
          >
            {t('cancel')}
          </Button>
        </div>
      </div>
    </>
  );
};
