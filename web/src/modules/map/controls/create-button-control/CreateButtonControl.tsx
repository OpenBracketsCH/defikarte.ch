import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import iconPlusWhite from '../../../../assets/icons/icon-plus-white.svg';
import { Button } from '../../../../components/ui/button/Button';
import { CreateMode } from '../../../../model/map';

type CreateButtonControlProps = {
  setCreateMode: Dispatch<SetStateAction<CreateMode>>;
};

export const CreateButtonControl = ({ setCreateMode }: CreateButtonControlProps) => {
  const { t } = useTranslation();
  return (
    <div className="absolute flex flex-col z-10 bottom-5 md:bottom-6 left-4 md:left-6">
      <Button
        variant="primary"
        size="large"
        icon={iconPlusWhite}
        onClick={() => setCreateMode(CreateMode.position)}
      >
        {t('create')}
      </Button>
    </div>
  );
};
