import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AEDData } from '../../../model/app';

const CreateStepOne = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formState] = useState({} as AEDData);

  const positionAvailable = formState.latitude != null && formState.longitude != null;
  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <div className="row"></div>
      <div className="row flex-grow-1"></div>
      <div className="row m-2">
        <Button
          disabled={!positionAvailable}
          variant="success"
          onClick={() => navigate('/Create-Step-2')}
        >
          {t('select')}
        </Button>
      </div>
    </div>
  );
};

export default CreateStepOne;
