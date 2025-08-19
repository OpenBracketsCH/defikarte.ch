import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
import { Route, Routes } from 'react-router';
import { Home } from './modules/home/Home';
import { Navbar } from './modules/nav-bar/NavBar';
import { Knowledge } from './modules/knowledge/Knowledge';

const App: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isMedium = useMediaQuery({ maxWidth: 1024 });
  const [position, setPosition] = useState<'top-right' | 'bottom-center'>('top-right');

  useEffect(() => {
    if (isMobile) {
      setPosition('bottom-center');
    } else {
      setPosition('top-right');
    }
  }, [isMobile]);

  return (
    <div className="flex flex-col">
      <Toaster
        position={position}
        containerStyle={{
          zIndex: 50,
          top: isMobile ? 'auto' : isMedium ? '4.75rem' : '5.5rem',
          bottom: isMobile ? '4.875rem' : 'auto',
          left: isMobile ? '1rem' : 'auto',
          right: isMobile ? '1rem' : '1.5rem',
          width: isMobile ? 'auto' : '100%',
        }}
        toastOptions={{ duration: 7200 }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/knowledge" element={<Knowledge />} />
      </Routes>
    </div>
  );
};

export default App;
