import MapView from 'ol/Map.js';
import View from 'ol/View.js';
import { defaults as defaultControls } from 'ol/control.js';
import Layer from 'ol/layer/Layer';

export class MapInstance {
  private mapInstance: MapView;

  constructor() {
    this.mapInstance = new MapView({
      layers: [],
      controls: defaultControls({ zoom: false }),
      view: new View({
        center: [905000, 5900000], // todo: save last view in local storage
        zoom: 8,
      }),
      moveTolerance: 1,
    });
  }

  public setTarget = (target: string | HTMLElement) => {
    this.mapInstance.setTarget(target);
  };

  public showLayer = (layer: Layer) => {
    layer.setVisible(true);
    if (!this.mapInstance.getLayers().getArray().includes(layer)) {
      this.mapInstance.addLayer(layer);
    }
  };

  public hideLayer = (layer: Layer) => {
    layer.setVisible(false);
  };
}
