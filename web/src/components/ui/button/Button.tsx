import classNames from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'regular' | 'large';
  icon?: string;
}

export const Button = ({
  variant = 'primary',
  size = 'regular',
  icon,
  children,
  ...props
}: Props) => {
  const buttonClass = classNames(
    'flex',
    'gap-2',
    'items-center',
    'rounded-[40px]',
    'cursor-pointer',
    {
      'bg-linear-to-r from-primary-100-green-03 to-primary-100-green-02 text-primary-100-white':
        variant === 'primary',
      'bg-primary-100-white text-primary-100-green-03': variant === 'secondary',
      'ps-3 pe-4 py-2': size === 'regular',
      'ps-4 pe-5 py-3': size === 'large',
    }
  );

  const iconClass = classNames({
    'w-4 h-4': size === 'regular',
    'w-5 h-5': size === 'large',
    'color-primary-100-white': variant === 'primary',
    'color-primary-100-green-03': variant === 'secondary',
  });

  return (
    <button className={buttonClass} {...props}>
      {icon && <img src={icon} alt="icon" className={iconClass} />}
      <span className="font-semibold lining-[150%]">{children}</span>
    </button>
  );
};
