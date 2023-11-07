import CreateForm from '../../../aed-form/CreateForm/CreateForm';
import { SubMenuProps } from '../Menu';
import './FormMenu.css';

export const AddMenu = (props: SubMenuProps) => {
  return (
    <div className="form-menu-container mobile" hidden={props.hidden}>
      <CreateForm loading={false} onSubmit={data => console.log(data)} onSelectPosition={() => {}}/>
    </div>
  );
};
