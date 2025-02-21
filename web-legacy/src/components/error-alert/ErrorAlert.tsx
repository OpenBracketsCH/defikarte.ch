import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Trans, useTranslation } from 'react-i18next';

type Props = {
  isError: boolean,
  resetError: () => void,
  retry: () => void,
  errorMsg: string,
}

const ErrorAlert = ({ isError, resetError, retry, errorMsg = 'n/a' }: Props) => {
  const { t } = useTranslation();

  if (isError) {
    return (
      <Alert variant="danger" onClose={() => resetError()} dismissible>
        <Alert.Heading>{t('error_api_title')}</Alert.Heading>
        <p>
          <Trans i18nKey="error_api"
            defaults="Errormessage: <0>{errorMsg}</0>"
            components={[<strong>dummyChild</strong>]}
            values={{ errorMsg }} />
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => retry()} variant="outline-secondary" className='me-2'>
            {t('try_again')}
          </Button>
          <a href={`mailto:info@defikarte.ch?subject=Fehlermeldung-in-Defikarte-Form&body=${errorMsg}`}>
            <Button onClick={() => resetError()} variant="outline-danger">
              {t('contact_support')}
            </Button>
          </a>
        </div>
      </Alert>
    );
  }
  else {
    return null;
  }
}

export default ErrorAlert