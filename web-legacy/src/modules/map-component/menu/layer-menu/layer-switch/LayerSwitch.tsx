import { useCallback, useId } from 'react';
import Switch from '../../../../../components/switch/Switch';
import './LayerSwitch.css';

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
    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'end', gap: '0.5rem' }}>
      <label htmlFor={`layer-label-${id}`} className="layer-switch-label">
        <Switch
          className='layer-switch-switch'
          id={`layer-label-${id}`}
          onChange={() => onToggleLayer()}
          selected={props.isVisible}
        />
        {props.name}
      </label>
    </div>
  );
};
