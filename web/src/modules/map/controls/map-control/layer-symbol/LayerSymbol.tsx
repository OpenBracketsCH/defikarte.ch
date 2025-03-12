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
    'bg-white',
    'rounded-xl',
    'shadow-[0px_4px_15px_0px_rgba(28,59,33,0.20)]',
    'outline-1',
    'outline-white',
    'flex',
    'flex-col',
    'justify-start',
    'items-center',
    'gap-1',
    {
      'border-2 border-offset-[-1px] border-[#98c867]': active,
    }
  );
  console.log(label, active);
  return (
    <button className={buttonClasses} {...props}>
      <img className="w-[54px] h-[41px] relative rounded-lg" src={img} alt={label} />
      <span className="self-stretch relative text-center justify-start text-[#154430] text-[9px] font-normal font-['Poppins'] leading-[13.50px]">
        {label}
      </span>
    </button>
  );
};
