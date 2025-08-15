import { useRef } from 'react';
import { Map } from '../map/Map';
import { MapFooter } from './map-footer/MapFooter';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation('static');
  const firstViewRef = useRef<HTMLDivElement>(null);

  const handleNextViewClick = () => {
    if (firstViewRef.current) {
      firstViewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="h-[calc(100vh-(52px))] lg:h-[calc(100vh-(--spacing(16)))] w-full flex flex-col overflow-hidden">
        <Map />
        <MapFooter onNextViewClick={handleNextViewClick} />
      </div>
      <div
        ref={firstViewRef}
        className="flex justify-center items-center h-100 bg-primary-100-green-04 text-primary-100-white"
      >
        <p>{t('exampleContent')}</p>
      </div>
    </>
  );
};
