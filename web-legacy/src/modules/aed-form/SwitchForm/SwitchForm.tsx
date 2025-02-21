import Form from 'react-bootstrap/Form';

interface Props {
  handle: any,
  disabled: boolean,
  label: string,
}

const SwitchForm = ({ handle, label, disabled }: Props) => {
  return (
    <div className='mb-2'>
      <Form.Check
        {...handle}
        type="switch"
        label={label}
        variant='success'
        disabled={disabled}
      />
    </div>
  );
};

export default SwitchForm;