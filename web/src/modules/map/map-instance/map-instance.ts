import { FeatureCollection } from 'geojson';
import { GeoJSONSource, LngLatLike, Map, StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import markerGreen from '../../../assets/icons/defi-map-marker-green.svg';
import markerOrange from '../../../assets/icons/defi-map-marker-orange.svg';
import markerGradientM from '../../../assets/icons/map-marker-count-gradient-m.svg';
import markerGradientS from '../../../assets/icons/map-marker-count-gradient-s.svg';
import markerGradientXl from '../../../assets/icons/map-marker-count-gradient-xl.svg';
import markerGradientXs from '../../../assets/icons/map-marker-count-gradient-xs.svg';
import { ActiveOverlayType } from '../../../model/map';
import { GeolocationService } from '../../../services/geolocation.service';
import { requestStyleSpecification } from '../../../services/map-style.service';
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
  private geolocationService: GeolocationService = new GeolocationService();
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
    this.overlayManager.registerOverlay(
      MapConfiguration.userLocationLayerId,
      new UserLocationOverlayStrategy(map)
    );
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
    this.overlayManager.applyOverlay(this.mapInstance, MapConfiguration.userLocationLayerId);

    console.log('Map initialized');
  };

  public async setActiveBaseLayer(id: string) {
    if (!this.mapInstance || this.activeBaseLayer === id) {
      return;
    }

    let style = await this.getBaseLayerStyleSpec(id);
    style = await this.overlayManager.applyOverlayOnStyle(
      this.createOverlayName(this.activeOverlay),
      style
    );

    style = await this.overlayManager.applyOverlayOnStyle(
      MapConfiguration.userLocationLayerId,
      style
    );

    this.activeBaseLayer = id;
    this.mapInstance?.setStyle(style, { diff: true });
  }

  public async setActiveOverlayLayer(overlay: ActiveOverlayType) {
    if (!this.mapInstance || this.isEqualOverlay(overlay, this.activeOverlay)) {
      return;
    }

    this.overlayManager.removeOverlay(this.mapInstance, this.createOverlayName(this.activeOverlay));
    this.overlayManager.applyOverlay(this.mapInstance, this.createOverlayName(overlay));
    this.activeOverlay = overlay;
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

  public watchUserPosition = async () => {
    if (!this.mapInstance) {
      return;
    }

    const newWatch = this.geolocationService.watchPosition(e =>
      this.setUserLocation(MapConfiguration.userLocationSourceId, e)
    );

    if (!newWatch) {
      return;
    }

    const currentPostion = await this.geolocationService.getCurrentPosition();
    if (currentPostion) {
      this.setUserLocation(MapConfiguration.userLocationSourceId, currentPostion);
      this.easyTo([currentPostion?.coords.longitude || 0, currentPostion?.coords.latitude || 0]);
    }
  };

  public clearUserPosition = () => {
    if (!this.mapInstance) {
      return;
    }

    this.setUserLocation(MapConfiguration.userLocationSourceId, null);
    this.geolocationService.clearWatch();
  };

  private getBaseLayerStyleSpec = async (baseLayerId: string): Promise<StyleSpecification> => {
    const baseLayerStyle = MapConfiguration.baseLayers[baseLayerId];
    if (!this.mapInstance || !baseLayerStyle) {
      return this.getEmptyStyleSpec();
    }

    let styleSpec: StyleSpecification | null = null;
    if (typeof baseLayerStyle === 'string') {
      styleSpec = await requestStyleSpecification(baseLayerStyle);
    } else {
      styleSpec = baseLayerStyle;
    }

    if (!styleSpec) {
      return this.getEmptyStyleSpec();
    }

    return styleSpec;
  };

  private setUserLocation = (sourceId: string, e: GeolocationPosition | null) => {
    const source = this.mapInstance?.getSource(sourceId) as GeoJSONSource;
    if (!source) {
      return;
    }

    if (!e) {
      source.setData({ type: 'FeatureCollection', features: [] });
      return;
    }

    const data = this.createUserLocationData(
      [e.coords.longitude, e.coords.latitude],
      e.coords.accuracy
    );
    source.setData(data);
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

  private getEmptyStyleSpec = (): StyleSpecification => {
    return { layers: {}, sources: {}, version: 8 } as StyleSpecification;
  };
}
