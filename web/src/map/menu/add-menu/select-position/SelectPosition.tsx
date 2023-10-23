import { FaCheck, FaX } from "react-icons/fa6";
import { SubMenuProps } from "../../Menu";
import "./SelectPosition.css";
import { useTranslation } from "react-i18next";

export const SelectPosition = (props: SubMenuProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div hidden={props.hidden} className="select-position-info-container">
        <p className="select-position-info-text">{t("select_position")}</p>
      </div>
      <div hidden={props.hidden} className="select-position-button-container">
        <button className="btn btn-secondary select-position-button-icon">
          <FaX />
          {t("cancel")}
        </button>
        <button className="btn btn-success select-position-button-icon">
          <FaCheck />
          {t("select")}
        </button>
      </div>
    </>
  );
};
