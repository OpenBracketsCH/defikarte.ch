import { useEffect, useState } from 'react';
import CreateForm from '../../../aed-form/CreateForm/CreateForm';
import { SubMenuProps } from '../Menu';
import './AddMenu.css';
import { SelectPosition } from './select-position/SelectPosition';

export const AddMenu = (props: SubMenuProps) => {
  const [activeStep, setActiveStep] = useState<'select' | 'form'>('select');
  useEffect(() => {
    setActiveStep('select');
  }, []);

  const selectPosition = () => {
    setActiveStep('form');
  };

  return (
    <>
      <div
        className="add-menu-form-container mobile"
        hidden={props.hidden || activeStep !== 'form'}
      >
        <CreateForm loading={false} onSubmit={data => console.log(data)} />
      </div>
      <SelectPosition
        hidden={props.hidden || activeStep !== 'select'}
        onSubmitPosition={selectPosition}
      />
    </>
  );
};
