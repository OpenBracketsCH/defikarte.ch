import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    const getLocation = () => {
      /*
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          console.log("Geolocation updated", position.coords);
          setGeolocation(position);
        }, (error) => {
          console.error("Error getting geolocation", error);
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }*/
    };
    getLocation();
  }, []);

  return { geolocation };
};
