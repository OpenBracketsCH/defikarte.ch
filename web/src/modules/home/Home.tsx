import { Dispatch, SetStateAction } from 'react';
import { useHandleNextViewClick } from '../../hooks/useHandleNextViewClick';
import { Map } from '../map/Map';
import { HomeInfo } from './home-info/HomeInfo';
import { MapFooter } from './map-footer/MapFooter';

type HomeProps = {
  isMapFullscreen: boolean;
  setIsMapFullscreen: Dispatch<SetStateAction<boolean>>;
};

export const Home = ({ isMapFullscreen, setIsMapFullscreen }: HomeProps) => {
  const { ref: firstViewRef, onClick: handleNextViewClick } = useHandleNextViewClick();

  return (
    <>
      <div className="h-[calc(100dvh-(52px))] lg:h-[calc(100dvh-(--spacing(16)))] w-full flex flex-col overflow-hidden">
        <Map setIsFullscreen={setIsMapFullscreen} />
        {!isMapFullscreen && <MapFooter onNextViewClick={handleNextViewClick} />}
      </div>
      {!isMapFullscreen && <HomeInfo ref={firstViewRef} />}
    </>
  );
};
