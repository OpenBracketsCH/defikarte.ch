import { FeatureCollection } from 'geojson';
import { GeoJSONSource, LngLatBoundsLike, LngLatLike, Map, StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import markerGreen from '../../../assets/icons/defi-map-marker-green.svg';
import markerOrange from '../../../assets/icons/defi-map-marker-orange.svg';
import markerPlusGreen from '../../../assets/icons/defi-map-marker-plus-green.svg';
import markerGradientM from '../../../assets/icons/map-marker-count-gradient-m.svg';
import markerGradientS from '../../../assets/icons/map-marker-count-gradient-s.svg';
import markerGradientXl from '../../../assets/icons/map-marker-count-gradient-xl.svg';
import markerGradientXs from '../../../assets/icons/map-marker-count-gradient-xs.svg';
import { MapEventCallback, OverlayType } from '../../../model/map';
import { requestStyleSpecification } from '../../../services/map-style.service';
import {
  MARKER_GRADIENT_M_IMAGE_ID,
  MARKER_GRADIENT_S_IMAGE_ID,
  MARKER_GRADIENT_XL_IMAGE_ID,
  MARKER_GRADIENT_XS_IMAGE_ID,
  MARKER_GREEN_IMAGE_ID,
  MARKER_ORANGE_IMAGE_ID,
  MARKER_PLUS_GREEN_IMAGE_ID,
} from './configuration/constants';
import { MapConfiguration } from './configuration/map.configuration';
import { alwaysAvailableFilterOverride, restrictedFilterOverride } from './filter/aed.filter';
import { OverlayManager } from './overlay-manager/overlay-manager';
import { AedAvailabilityOverlayStrategy } from './overlay-manager/overlays/aed-availability.overlay';
import { AedCreateOverlayStrategy } from './overlay-manager/overlays/aed-create.overlay';
import { AedOverlayStrategy } from './overlay-manager/overlays/aed.overlay';
import { UserLocationOverlayStrategy } from './overlay-manager/overlays/user-location.overlay';

type MapInstanceProps = {
  container: string | HTMLElement;
  baseLayer: string;
  overlays: OverlayType[];
  onEvent?: MapEventCallback;
};

export class MapInstance {
  private mapInstance: Map | null = null;
  private overlayManager: OverlayManager;
  private activeBaseLayer: string;

  constructor(props: MapInstanceProps) {
    this.overlayManager = new OverlayManager(props.onEvent);
    this.activeBaseLayer = props.baseLayer;
    const map = new Map({
      container: props.container,
      style: MapConfiguration.baseLayers[this.activeBaseLayer],
      center: MapConfiguration.defaultCenter,
      zoom: MapConfiguration.defaultZoom,
      attributionControl: false,
    });

    this.overlayManager.registerOverlay(OverlayType.aed, new AedOverlayStrategy());
    this.overlayManager.registerOverlay(
      OverlayType.aedRestricted,
      new AedOverlayStrategy(restrictedFilterOverride)
    );
    this.overlayManager.registerOverlay(
      OverlayType.aed247,
      new AedOverlayStrategy(alwaysAvailableFilterOverride)
    );
    this.overlayManager.registerOverlay(
      OverlayType.aedAvailability,
      new AedAvailabilityOverlayStrategy(map)
    );
    this.overlayManager.registerOverlay(
      OverlayType.userLocation,
      new UserLocationOverlayStrategy(map)
    );
    this.overlayManager.registerOverlay(OverlayType.aedCreate, new AedCreateOverlayStrategy());

    map.on('load', () => this.init(map, props.overlays));
  }

  public init = async (map: Map, overlays: OverlayType[]) => {
    const images = [
      { id: MARKER_GREEN_IMAGE_ID, url: markerGreen },
      { id: MARKER_ORANGE_IMAGE_ID, url: markerOrange },
      { id: MARKER_GRADIENT_XS_IMAGE_ID, url: markerGradientXs },
      { id: MARKER_GRADIENT_S_IMAGE_ID, url: markerGradientS },
      { id: MARKER_GRADIENT_M_IMAGE_ID, url: markerGradientM },
      { id: MARKER_GRADIENT_XL_IMAGE_ID, url: markerGradientXl },
      { id: MARKER_PLUS_GREEN_IMAGE_ID, url: markerPlusGreen },
    ];

    images.forEach(image => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => {
        // need to scale the image to 4x for hig-res displays
        img.width = img.width * 4;
        img.height = img.height * 4;
        map.addImage(image.id, img);
      };
    });

    this.mapInstance = map;
    for (const overlay of overlays) {
      this.overlayManager.applyOverlay(this.mapInstance, overlay);
    }
    console.log('Map initialized');
  };

  public async setActiveBaseLayer(id: string) {
    if (!this.mapInstance || this.activeBaseLayer === id) {
      return;
    }

    let style = await this.getBaseLayerStyleSpec(id);
    style = await this.overlayManager.applyActiveOverlaysOnStyle(style);

    this.activeBaseLayer = id;
    this.mapInstance?.setStyle(style, { diff: true });
  }

  public applyOverlay(overlayId: OverlayType) {
    if (!this.mapInstance) {
      return;
    }

    this.overlayManager.applyOverlay(this.mapInstance, overlayId);
  }

  public removeOverlay(overlayId: OverlayType) {
    if (!this.mapInstance) {
      return;
    }

    this.overlayManager.removeOverlay(this.mapInstance, overlayId);
  }

  public easeTo(coordinates: LngLatLike, zoom?: number) {
    this.mapInstance?.easeTo({
      center: coordinates,
      zoom: zoom ?? this.mapInstance.getZoom(),
    });
  }

  public fitBounds(bounds: LngLatBoundsLike) {
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

  public getActiveMapInteractions = () => {
    return this.overlayManager.getActiveMapInteractions();
  };

  public getActiveOverlaySourceIds = () => {
    return this.overlayManager.getActiveSourceIds();
  };

  public setGeoJSONSourceData = (sourceId: string, data: FeatureCollection | null) => {
    const source = this.mapInstance?.getSource(sourceId) as GeoJSONSource;
    if (!source) {
      return;
    }

    if (!data) {
      source.setData({ type: 'FeatureCollection', features: [] });
      return;
    }

    source.setData(data);
  };

  public async getGeoJsonSourceData(sourceId: string): Promise<FeatureCollection> {
    if (!this.mapInstance) {
      return { type: 'FeatureCollection', features: [] };
    }

    const source = this.mapInstance.getSource(sourceId) as GeoJSONSource;
    if (!source) {
      return { type: 'FeatureCollection', features: [] };
    }

    return (await source.getData()) as FeatureCollection;
  }

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

  private getEmptyStyleSpec = (): StyleSpecification => {
    return { layers: {}, sources: {}, version: 8 } as StyleSpecification;
  };
}
