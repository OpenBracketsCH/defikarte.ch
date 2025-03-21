import { FeatureCollection } from 'geojson';
import { LngLatLike, Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import markerGreen from '../../../assets/icons/defi-map-marker-green.svg';
import markerOrange from '../../../assets/icons/defi-map-marker-orange.svg';
import markerGradientM from '../../../assets/icons/map-marker-count-gradient-m.svg';
import markerGradientS from '../../../assets/icons/map-marker-count-gradient-s.svg';
import markerGradientXl from '../../../assets/icons/map-marker-count-gradient-xl.svg';
import markerGradientXs from '../../../assets/icons/map-marker-count-gradient-xs.svg';
import { ActiveOverlayType } from '../../../model/map';
import {
  MARKER_GRADIENT_M_IMAGE_ID,
  MARKER_GRADIENT_S_IMAGE_ID,
  MARKER_GRADIENT_XL_IMAGE_ID,
  MARKER_GRADIENT_XS_IMAGE_ID,
  MARKER_GREEN_IMAGE_ID,
  MARKER_ORANGE_IMAGE_ID,
} from './configuration/constants';
import { MapConfiguration } from './configuration/map.configuration';
import { alwaysAvailableFilterOverride, restrictedFilterOverride } from './filter/aed.filter';
import { AedAvailabilityOverlayStrategy } from './overlay-manager/aed-availability.overlay';
import { AedOverlayStrategy } from './overlay-manager/aed.overlay';
import { OverlayManager } from './overlay-manager/overlay-manager';
import { UserLocationOverlayStrategy } from './overlay-manager/user-location.overlay';

type MapInstanceProps = {
  container: string | HTMLElement;
};

export class MapInstance {
  private mapInstance: Map | null = null;
  private overlayManager: OverlayManager = new OverlayManager();
  private activeBaseLayer: string = MapConfiguration.osmBaseMapId;
  private activeOverlay: ActiveOverlayType = ['247', 'restricted'];

  constructor(props: MapInstanceProps) {
    const map = new Map({
      container: props.container,
      style: MapConfiguration.baseLayers[this.activeBaseLayer],
      center: MapConfiguration.defaultCenter,
      zoom: MapConfiguration.defaultZoom,
      attributionControl: false,
    });

    map.on('load', () => this.init(map));

    this.overlayManager.registerOverlay(
      this.createOverlayName(['247', 'restricted']),
      new AedOverlayStrategy()
    );

    this.overlayManager.registerOverlay(
      this.createOverlayName(['restricted']),
      new AedOverlayStrategy(restrictedFilterOverride)
    );
    this.overlayManager.registerOverlay(
      this.createOverlayName(['247']),
      new AedOverlayStrategy(alwaysAvailableFilterOverride)
    );
    this.overlayManager.registerOverlay(
      this.createOverlayName('availability'),
      new AedAvailabilityOverlayStrategy()
    );
    this.overlayManager.registerOverlay('userLocation', new UserLocationOverlayStrategy());
  }

  public init = async (map: Map) => {
    const images = [
      { id: MARKER_GREEN_IMAGE_ID, url: markerGreen },
      { id: MARKER_ORANGE_IMAGE_ID, url: markerOrange },
      { id: MARKER_GRADIENT_XS_IMAGE_ID, url: markerGradientXs },
      { id: MARKER_GRADIENT_S_IMAGE_ID, url: markerGradientS },
      { id: MARKER_GRADIENT_M_IMAGE_ID, url: markerGradientM },
      { id: MARKER_GRADIENT_XL_IMAGE_ID, url: markerGradientXl },
    ];

    images.forEach(image => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => {
        map.addImage(image.id, img);
      };
    });

    this.mapInstance = map;
    this.overlayManager.applyOverlay(this.mapInstance, this.createOverlayName(this.activeOverlay));
    console.log('map initialized');
  };

  public setActiveBaseLayer(id: string) {
    this.activeBaseLayer = id;
    this.updateStyle();
  }

  public async setActiveOverlayLayer(overlay: ActiveOverlayType) {
    if (!this.mapInstance || this.isEqualOverlay(overlay, this.activeOverlay)) {
      return;
    }

    this.overlayManager.removeOverlay(this.mapInstance, this.createOverlayName(this.activeOverlay));
    this.overlayManager.applyOverlay(this.mapInstance, this.createOverlayName(overlay));
    this.activeOverlay = overlay;
    this.updateStyle();
  }

  public easyTo(coordinates: LngLatLike, zoom?: number) {
    this.mapInstance?.easeTo({
      center: coordinates,
      zoom: zoom ?? this.mapInstance.getZoom(),
    });
  }

  public fitBounds(bounds: [[number, number], [number, number]]) {
    this.mapInstance?.fitBounds(bounds, {
      padding: 10,
      maxZoom: 18,
    });
  }

  public zoomIn() {
    this.mapInstance?.zoomIn();
  }

  public zoomOut() {
    this.mapInstance?.zoomOut();
  }

  public remove = () => {
    this.mapInstance?.remove();
  };

  private updateStyle = async () => {
    if (!this.mapInstance) {
      return;
    }
    /*
    const baseLayerStyle = MapConfiguration.baseLayers[this.activeBaseLayer];

    if (!baseLayerStyle) {
      return;
    }

    let styleSpec: StyleSpecification | null = null;
    if (typeof baseLayerStyle === 'string') {
      styleSpec = await requestStyleSpecification(baseLayerStyle);
    } else {
      styleSpec = baseLayerStyle;
    }

    if (!styleSpec) {
      this.mapInstance.setStyle({ layers: {}, sources: {}, version: 8 } as StyleSpecification);
      return;
    }

    const updatedStyle =
      this.activeOverlay === 'availability'
        ? await this.extendAedAvailabilityLayers(styleSpec)
        : this.extendAedLayers(styleSpec, this.activeOverlay);

    const finalStyle = this.extendUserLocationLayer(updatedStyle);
    console.log('finalStyle', finalStyle);
    this.mapInstance.setStyle(finalStyle, { diff: true });
    */
  };

  private createUserLocationData(coordinates: LngLatLike, accuracy: number) {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: coordinates,
          },
          properties: {
            accuracy: accuracy,
          },
        },
      ],
    } as FeatureCollection;
  }

  private createOverlayName = (overlay: ActiveOverlayType) => {
    return overlay === 'availability' ? overlay : overlay.sort().join('');
  };

  private isEqualOverlay(overlay1: ActiveOverlayType, overlay2: ActiveOverlayType): boolean {
    if (typeof overlay1 === 'string' && typeof overlay2 === 'string') {
      return overlay1 === overlay2;
    } else if (Array.isArray(overlay1) && Array.isArray(overlay2)) {
      return (
        overlay1.length === overlay2.length &&
        overlay1.every((value, index) => value === overlay2[index])
      );
    }

    return false;
  }
}
