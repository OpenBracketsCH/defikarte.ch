import classNames from 'classnames';
import { HTMLAttributes } from 'react';

interface LayerSymbolProps extends HTMLAttributes<HTMLButtonElement> {
  active: boolean;
  img: string;
  label: string;
}

export const LayerSymbol = ({ active, img, label, ...props }: LayerSymbolProps) => {
  const buttonClasses = classNames(
    'p-2',
    'pb-1.5',
    'bg-primary-100-white',
    'rounded-xl',
    'shadow-primary-20-green-04',
    'shadow-custom',
    'flex',
    'flex-col',
    'gap-1',
    {
      'border-2 border-primary-100-green-02': active,
    }
  );

  return (
    <button className={buttonClasses} {...props}>
      <img className="w-[54px] h-[41px] relative rounded-lg" src={img} alt={label} />
      <span className="text-primary-100-green-04 leading-6">{label}</span>
    </button>
  );
};
