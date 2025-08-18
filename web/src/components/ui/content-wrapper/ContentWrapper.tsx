import cn from 'classnames';

interface ContentWrapperProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'beige' | 'green-gradient' | 'green';
  paddingY?: 'small' | 'regular' | 'large';
}

export const ContentWrapper = ({
  children,
  className,
  variant = 'white',
  paddingY = 'regular',
  ...props
}: ContentWrapperProps) => {
  const containerClasses = cn('w-[100%]', 'flex', 'justify-center', 'items-center', {
    'bg-primary-100-white': variant === 'white',
    'bg-beige': variant === 'beige',
    'bg-gradient-to-b from-primary-100-green-03 to-primary-100-green-02':
      variant === 'green-gradient',
    'bg-primary-100-green-04': variant === 'green',
  });

  const contentClasses = cn(
    'flex',
    'justify-center',
    'items-center',
    'w-[100%]',
    'md:w-[700px]',
    'lg:w-[800px]',
    'xl:w-[1000px]',
    {
      'py-20': paddingY === 'small',
      'py-28': paddingY === 'regular',
      'py-32': paddingY === 'large',
    },
    className
  );

  return (
    <div className={containerClasses} {...props}>
      <div className={contentClasses}>{children}</div>
    </div>
  );
};
