import React from 'react';

interface ItemPropertyProps {
  icon: string;
  title: string;
  value: string | number;
}

const ItemProperty: React.FC<ItemPropertyProps> = ({ icon, title, value }) => {
  return (
    <div className="flex items-start gap-2">
      <img src={icon} />
      <div>
        <h4 className="text-xs font-semibold text-primary-100-green-04 leading-[150%]">{title}</h4>
        <p className="text-xs font-normal text-primary-100-green-04 leading-[150%]">{value}</p>
      </div>
    </div>
  );
};

export default ItemProperty;
