import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router';
import { Map } from './modules/map/Map';
import { useMediaQuery } from 'react-responsive';

const App: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [position, setPosition] = useState<'top-right' | 'bottom-center'>('top-right');

  useEffect(() => {
    if (isMobile) {
      setPosition('bottom-center');
    } else {
      setPosition('top-right');
    }
  }, [isMobile]);

  return (
    <div className="h-screen">
      <Toaster
        position={position}
        containerStyle={{
          zIndex: 10015,
          top: isMobile ? 'auto' : '1.5rem',
          bottom: isMobile ? '1.25rem' : 'auto',
          left: isMobile ? '1rem' : 'auto',
          right: isMobile ? '1rem' : '1.5rem',
          width: isMobile ? 'auto' : '100%',
        }}
        toastOptions={{ duration: 7200 }}
      />
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </div>
  );
};

export default App;
