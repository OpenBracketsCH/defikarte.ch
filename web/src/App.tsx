import React, { lazy, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
import { Route, Routes, useLocation } from 'react-router';
import { SuspenseWrapper } from './components/ui/suspense-wrapper/SupsenseWrapper';
import { Footer } from './modules/footer/Footer';
import { Home } from './modules/home/Home';
import { Navbar } from './modules/nav-bar/NavBar';
import { NotFound } from './modules/not-found/NotFound';

const Knowledge = lazy(() =>
  import('./modules/knowledge/Knowledge').then(module => ({ default: module.Knowledge }))
);
const Privacy = lazy(() =>
  import('./modules/privacy/Privacy').then(module => ({ default: module.Privacy }))
);
const Project = lazy(() =>
  import('./modules/project/Project').then(module => ({ default: module.Project }))
);
const Sponsors = lazy(() =>
  import('./modules/sponsors/Sponsors').then(module => ({ default: module.Sponsors }))
);

const ScrollToTop = () => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isMedium = useMediaQuery({ maxWidth: 1024 });
  const [position, setPosition] = useState<'top-right' | 'bottom-center'>('top-right');
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

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
      <ScrollToTop />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <Home isMapFullscreen={isMapFullscreen} setIsMapFullscreen={setIsMapFullscreen} />
          }
        />
        <Route
          path="/knowledge"
          element={
            <SuspenseWrapper>
              <Knowledge />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/project"
          element={
            <SuspenseWrapper>
              <Project />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/sponsors"
          element={
            <SuspenseWrapper>
              <Sponsors />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/privacy"
          element={
            <SuspenseWrapper>
              <Privacy />
            </SuspenseWrapper>
          }
        />
      </Routes>
      {!isMapFullscreen && <Footer />}
    </div>
  );
};

export default App;
