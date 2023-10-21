import { useCallback, useId } from "react";

type Props = {
  name: string;
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
};

export const LayerSwitch = (props: Props) => {
  const id = useId();
  const onToggleLayer = useCallback(() => {
    props.setVisible(!props.isVisible);
  }, [props]);

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id={`layer-label-${id}`}
        onChange={() => onToggleLayer()}
        checked={props.isVisible}
      />
      <label className="form-check-label" htmlFor={`layer-label-${id}`}>
        {props.name}
      </label>
    </div>
  );
};
