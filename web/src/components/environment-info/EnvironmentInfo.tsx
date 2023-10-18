import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const EnvironmentInfo = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);

  const onClose = (e: any) => {
    setShow(false);
  }

  if (process.env.REACT_APP_ENVIRONMENT !== 'production' && show) {
    return (
      <Alert style={{ position: 'fixed', top: 0 }} className="w-100" dismissible variant="warning" onClose={e => onClose(e)}>
        <Alert.Heading>{t('environment_info')} {process.env.REACT_APP_ENVIRONMENT}, Build: {process.env.NODE_ENV}</Alert.Heading>
      </Alert>
    )
  }
  else {
    return null;
  }
}

export default EnvironmentInfo;