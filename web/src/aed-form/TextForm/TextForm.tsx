import { Form } from "react-bootstrap";
import './TextForm.css';
import { FormProps } from "../../model/app";

interface Props extends FormProps {
  handle: any,
  errors: any,
  disabled: boolean,
}

const TextForm = ({ name, handle, label, errors, errorMsg, placeholder, disabled, type }: Props) => {
  return (
    <div className="mb-2">
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Form.Control
        {...handle}
        type={type}
        id={name}
        placeholder={placeholder}
        isInvalid={errors[name]}
        disabled={disabled}
      />
      <Form.Control.Feedback type="invalid">
        {errorMsg}
      </Form.Control.Feedback>
    </div>
  );
}

export default TextForm;