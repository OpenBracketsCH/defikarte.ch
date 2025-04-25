import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  variant?: 'tint' | 'secondary' | 'white';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'tint',
  className,
  ...props
}) => {
  const imgClass = classNames('p-1', 'rounded-full', 'box-content', 'size-max', 'cursor-pointer', {
    'bg-primary-20-green-02': variant === 'tint',
    'bg-primary-green-custom': variant === 'secondary',
    'bg-primary-100-white': variant === 'white',
    'hover:bg-green-custom': variant === 'white',
  });

  return (
    <button className={className} {...props}>
      <img src={icon} alt="map-icon" className={imgClass} />
    </button>
  );
};
