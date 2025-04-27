import classNames from 'classnames';
import { useState } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white';
  size?: 'regular' | 'large';
  icon?: string;
  iconHover?: string;
  iconOnly?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'regular',
  icon,
  iconHover,
  children,
  iconOnly,
  className,
  ...props
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  iconHover = iconHover ?? icon;

  const buttonClass = classNames(className, 'flex', 'gap-2', 'items-center', 'cursor-pointer', {
    'bg-linear-to-r from-primary-100-green-03 to-primary-100-green-02 text-primary-100-white':
      variant === 'primary',
    'hover:bg-linear-to-r hover:from-green-custom-02 hover:to-primary-100-green-02':
      variant === 'primary',
    'bg-primary-100-white text-primary-100-green-03':
      variant === 'white' || variant === 'secondary',
    'hover:text-primary-100-green-04': variant === 'white',
    'ps-2 md:ps-3 pe-3 md:pe-4 py-1.5 md:py-2': size === 'regular' && !iconOnly,
    'ps-2 md:ps-4 pe-3 md:pe-5 py-1.5 md:py-3': size === 'large' && !iconOnly,
    'rounded-[theme(space.10)]': !iconOnly,
    'p-1.5 rounded-4xl': iconOnly,
  });

  const iconClass = classNames({
    'w-4 h-4': size === 'regular',
    'w-5 h-5': size === 'large',
    'color-primary-100-white': variant === 'primary',
    'hover:color-primary-100-green-04': variant === 'primary', // Added hover effect
    'color-primary-100-green-03': variant === 'secondary',
  });

  const textClass = classNames('leading-[150%]', {
    'font-semibold': variant === 'primary' || variant === 'white',
    'font-normal': variant === 'secondary',
  });

  return (
    <button
      className={buttonClass}
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon && <img src={isHovered ? iconHover : icon} alt="icon" className={iconClass} />}
      {!iconOnly && <span className={textClass}>{children}</span>}
    </button>
  );
};
