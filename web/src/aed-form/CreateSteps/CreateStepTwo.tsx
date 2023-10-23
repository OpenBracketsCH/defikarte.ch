import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import backend from "../../api/backend";
import ErrorAlert from "../../components/error-alert/ErrorAlert";
import { AEDData } from "../../model/app";
import CreateForm from "../CreateForm/CreateForm";

const initErrorState = { isError: false, msg: "" };

const CreateStepTwo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [state, setState] = useState({} as AEDData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initErrorState);

  const onSubmit = (aedData: AEDData) => {
    setLoading(true);
    backend
      .post("/defibrillator", {
        ...aedData,
        source: "local_knowledge, defikarte.ch",
      })
      .then((r) => {
        setState({} as AEDData); // reseting form data, so no old data anymore. user has to start from beginning
        navigate("/Create-Step-Success");
      })
      .catch((e) => {
        setError({ isError: true, msg: e.message });
      })
      .finally(() => setLoading(false));
  };

  const retry = (aedData: AEDData) => {
    setError(initErrorState);
    onSubmit(aedData);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <ErrorAlert
        isError={error.isError}
        errorMsg={error.msg}
        retry={() => retry(state)}
        resetError={() => setError(initErrorState)}
      />
      <CreateForm loading={loading} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateStepTwo;
