import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import formconfig from "../configuration/formconfig";
import { AEDData } from "../../model/app";
import SwitchForm from "../SwitchForm/SwitchForm";
import TextForm from "../TextForm/TextForm";
import "./CreateForm.css";

type Props = {
  loading: boolean;
  onSubmit: (aedData: AEDData) => void;
};

const CreateForm = ({ loading, onSubmit }: Props) => {
  const [state, setState] = useState({} as AEDData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AEDData>();
  const { t } = useTranslation();
  const [positionError, setPositionError] = useState<string | null>(null);

  useEffect(() => {
    if (state.latitude == null || state.longitude == null) {
      setPositionError(t("error_pos"));
    } else {
      setPositionError(null);
    }
  }, [state, setPositionError, t]);

  const onHandleSubmit = (formState: AEDData, formValues: AEDData) => {
    if (formState.latitude != null && formState.longitude != null) {
      const submitedState = {
        ...formState,
        ...formValues,
        emergencyPhone: "144",
      } as AEDData;
      setState(submitedState);
      onSubmit(submitedState);
    }
  };

  const renderFormComponent = () => {
    return formconfig.map((formComp, index) => {
      if (formComp.type === "switch") {
        return (
          <SwitchForm
            handle={register(formComp.name, { ...formComp.rules })}
            key={index}
            label={t(formComp.label)}
            disabled={loading}
          />
        );
      } else {
        const errorMsg = t(formComp.errorMsg || "default_error");
        const placeholder = t(formComp.placeholder || "");
        return (
          <TextForm
            name={formComp.name}
            handle={register(formComp.name, { ...formComp.rules })}
            errors={errors}
            errorMsg={errorMsg}
            defaultValue={formComp.defaultValue}
            key={index}
            label={t(formComp.label)}
            placeholder={placeholder}
            disabled={loading}
            type={formComp.type}
          />
        );
      }
    });
  };

  const position =
    state.longitude != null && state.latitude != null
      ? `${state.latitude?.toFixed(4)}, ${state.longitude?.toFixed(4)}`
      : "n/a";
  return (
    <Form
      onSubmit={handleSubmit((data) => onHandleSubmit(state, data))}
      className="form-inline"
    >
      <div className="mb-3 form-inline">
        <p>{t("position")}</p>
        <p
          className={
            positionError != null
              ? "border-bottom  border-danger"
              : "border-bottom"
          }
        >
          {position}
        </p>
        {positionError !== null ? (
          <p className="error">{positionError}</p>
        ) : null}
      </div>
      {renderFormComponent()}
      <Button
        variant="success"
        type="submit"
        value="submit"
        className="w-100 my-3"
        disabled={loading}
      >
        {loading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : null}
        {t("submit")}
      </Button>
    </Form>
  );
};

export default CreateForm;
