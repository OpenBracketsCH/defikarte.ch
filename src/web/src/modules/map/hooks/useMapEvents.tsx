import { useState } from 'react';
import { type MapEvent } from '../../../model/map';

type SourceState = Record<string, 'loading' | 'loaded' | 'abort' | 'error'>;

export const useMapEvents = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [, setSourceState] = useState<SourceState>({});

  const handleMapEvent = (event: MapEvent) => {
    if (event.type === 'map-state' && event.source) {
      setSourceState(prevState => {
        const newState = { ...prevState, [event.source]: event.state };
        const isAnySourceLoading = Object.values(newState).some(state => state === 'loading');

        // it is important to onyl set isInitialized to true. if not the map-splash-screen appears with every load.
        if (!isAnySourceLoading) {
          setIsInitialized(true);
        }
        return newState;
      });
    }
  };

  return { isInitialized, handleMapEvent };
};
