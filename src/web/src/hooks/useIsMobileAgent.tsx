import { useEffect, useState } from 'react';

export const useIsMobileAgent = () => {
  const [isMobileAgent, setIsMobileAgent] = useState(false);

  const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  useEffect(() => {
    setIsMobileAgent(isMobile());
  }, []);

  return isMobileAgent;
};
