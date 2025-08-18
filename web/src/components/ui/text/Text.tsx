import cn from 'classnames';

interface TextProps extends React.ParamHTMLAttributes<HTMLParagraphElement> {
  size?: 'small' | 'regular' | 'medium' | 'large' | 'x-large';
  weight?: 'light' | 'regular' | 'bold';
  variant?: 'primary' | 'tint' | 'white';
  center?: boolean;
}

export const Text = ({
  children,
  className,
  size = 'small',
  weight = 'regular',
  variant = 'primary',
  center = false,
  ...props
}: TextProps) => {
  const classNames = cn(
    'max-w-[700px]',
    {
      'text-base': size === 'small',
      'text-xl': size === 'regular',
      'text-[26px]': size === 'medium',
      'text-[34px]': size === 'large',
      'text-[44px]': size === 'x-large',
      'font-light': weight === 'light',
      'font-normal': weight === 'regular',
      'font-medium': weight === 'bold',
      'leading-[150%]': size === 'small' || size === 'regular',
      'leading-[130%]': size === 'medium' || size === 'large' || size === 'x-large',
      'text-primary-100-green-04': variant === 'primary',
      'text-primary-100-green-01': variant === 'tint',
      'text-primary-100-white': variant === 'white',
      'text-center': center,
    },
    className
  );

  return (
    <p className={classNames} {...props}>
      {children}
    </p>
  );
};
