import { type Dispatch, type SetStateAction, createContext, useContext } from 'react';

type FullScreenContextType = {
  isMapFullscreen: boolean;
  setIsMapFullscreen: Dispatch<SetStateAction<boolean>>;
};

export const FullScreenContext = createContext<FullScreenContextType | null>(null);

export const useFullscreenState = () => {
  const context = useContext(FullScreenContext);
  if (!context) throw new Error('useFullscreenState must be used within FullScreenContext');
  return context;
};
