import { Dispatch, SetStateAction } from 'react';
import { FullscreenWrapper } from '../../components/ui/fullscreen-wrapper/FullscreenWarpper';
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
      <FullscreenWrapper>
        <Map setIsFullscreen={setIsMapFullscreen} isHash={false} />
        {!isMapFullscreen && <MapFooter onNextViewClick={handleNextViewClick} />}
      </FullscreenWrapper>
      {!isMapFullscreen && <HomeInfo ref={firstViewRef} />}
    </>
  );
};
