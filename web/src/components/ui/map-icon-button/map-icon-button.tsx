import className from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface MapIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  icon: string;
}

export const MapIconButton: React.FC<MapIconButtonProps> = ({ active, icon, ...props }) => {
  const buttonClass = className(
    'p-1',
    'rounded-full',
    'inline-flex',
    'gap-2.5',
    'justify-center',
    'items-center',
    'w-7',
    'h-7',
    {
      'bg-white': !active,
      'bg-[#93c460]': active,
    }
  );

  return (
    <button className={buttonClass} {...props}>
      <img src={icon} alt="map-icon" />
    </button>
  );
};
