import { useTranslation } from "react-i18next";
import { FaCheck, FaX } from "react-icons/fa6";
import "./SelectPosition.css";

type Props = {
  hidden: boolean;
  onSubmitPosition: () => void;
};

export const SelectPosition = (props: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <div hidden={props.hidden} className="select-position-info-container">
        <p className="select-position-info-text">{t("select_position")}</p>
      </div>
      <div hidden={props.hidden} className="select-position-button-container">
        <button
          onClick={() => props.onSubmitPosition()}
          className="btn btn-success select-position-button-icon"
        >
          <FaCheck />
          {t("select")}
        </button>
        <button className="btn btn-secondary select-position-button-icon">
          <FaX />
          {t("cancel")}
        </button>
      </div>
    </>
  );
};
