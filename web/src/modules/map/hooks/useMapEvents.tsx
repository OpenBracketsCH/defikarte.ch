import { useEffect, useState } from 'react';
import { MapEvent } from '../../../model/map';

interface SourceState {
  [key: string]: 'loading' | 'loaded' | 'abort' | 'error';
}

export const useMapEvents = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [, setSourceState] = useState<SourceState>({});
  const [isAnySourceLoading, setIsAnySourceLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isAnySourceLoading) {
      setIsInitialized(true);
    }
  }, [isAnySourceLoading]);

  const handleMapEvent = (event: MapEvent) => {
    if (event.type === 'map-state' && event.source) {
      setSourceState(prevState => {
        const newState = { ...prevState, [event.source as string]: event.state };
        setIsAnySourceLoading(Object.values(newState).some(state => state === 'loading'));
        return newState;
      });
    }
  };

  return { isInitialized, handleMapEvent };
};
