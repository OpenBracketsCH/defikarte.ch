import { HTMLInputTypeAttribute, useId } from 'react';
import { TooltipData } from '../../../model/app';
import { Tooltip } from '../tooltip/Tooltip';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: HTMLInputTypeAttribute;
  tooltip?: TooltipData;
}

export const TextField = ({ label, type, tooltip, ...props }: TextFieldProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5 text-xs leading-[150%]">
      <div className="flex flex-row gap-0.5 align-middle">
        <label htmlFor={id} className="font-semibold text-primary-100-green-04">
          {label}
        </label>
        <Tooltip tooltip={tooltip} />
      </div>
      <input
        id={id}
        type={type}
        className="px-3 py-2.5 align-middle rounded-lg font-normal text-primary-100-black placeholder:text-primary-60-green-04  border border-primary-10-green-05 focus:outline focus:border-primary-10-green-05  focus:outline-primary-10-green-05  bg-primary-100-white"
        {...props}
      />
    </div>
  );
};
