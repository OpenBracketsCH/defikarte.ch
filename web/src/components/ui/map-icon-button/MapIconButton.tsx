import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface MapIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  icon: string;
  variant?: 'default' | 'gps-on' | 'gps-off';
}

export const MapIconButton: React.FC<MapIconButtonProps> = ({
  active,
  icon,
  variant = 'default',
  className,
  ...props
}) => {
  const buttonClass = classNames(className, 'w-max', 'h-max');
  const imgClass = classNames('p-1', 'rounded-full', 'box-content', 'size-max', 'cursor-pointer', {
    'hover:bg-green-custom': !active,
    'bg-primary-100-white': !active && variant === 'default',
    'bg-secondary-green-01': active,
    'border-2': variant === 'gps-off' || variant === 'gps-on',
    'md:border-4': variant === 'gps-off' || variant === 'gps-on',
    'border-transparent': variant === 'gps-off' || variant === 'gps-on',
    'bg-primary-20-green-02': variant === 'gps-on',
  });

  return (
    <button {...props} className={buttonClass}>
      <img src={icon} alt="map-icon" className={imgClass} />
    </button>
  );
};
