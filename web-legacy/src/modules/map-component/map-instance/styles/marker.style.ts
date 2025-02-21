import { FeatureLike } from "ol/Feature";
import { Style, Icon } from "ol/style";


const markerStyleFunction = (feature: FeatureLike, resolution: number) => {
  const style = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'assets/img/marker.png',
      scale: 0.5,
    }),
  });

  return [style];
}

export default markerStyleFunction;
