import { FilterSpecification, LngLatLike, Map, StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import markerGreen from '../../../assets/icons/defi-map-marker-green.svg';
import markerOrange from '../../../assets/icons/defi-map-marker-orange.svg';
import markerGradientM from '../../../assets/icons/map-marker-count-gradient-m.svg';
import markerGradientS from '../../../assets/icons/map-marker-count-gradient-s.svg';
import markerGradientXl from '../../../assets/icons/map-marker-count-gradient-xl.svg';
import markerGradientXs from '../../../assets/icons/map-marker-count-gradient-xs.svg';
import { ActiveOverlayType } from '../../../model/map';
import { requestAedDataByCurrentAvailability } from '../../../services/aed-data.service';
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
import AedSelectInteraction from './interactions/aed-select.interaction';
import ClusterZoomInteraction from './interactions/cluster-zoom.interaction';
import CursorClickableInteraction from './interactions/cursor-clickable.interaction';
import { createAedAvailabilityPointLayers } from './layers/aed-availability-point.layer';
import { createAedClusterLayers } from './layers/aed-cluster.layer';
import { createAedPointLayers } from './layers/aed-point.layer';
import { createAedSource } from './sources/aed.source';

type MapInstanceProps = {
  container: string | HTMLElement;
};

export class MapInstance {
  private mapInstance: Map | null = null;
  private activeBaseLayer: string = MapConfiguration.osmBaseMapId;
  private activeOverlay: ActiveOverlayType = ['247', 'restricted'];

  constructor(props: MapInstanceProps) {
    const map = new Map({
      container: props.container,
      style: MapConfiguration.baseLayers[this.activeBaseLayer],
      center: MapConfiguration.defaultCenter,
      zoom: MapConfiguration.defaultZoom,
    });

    map.on('load', () => this.init(map));
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
    this.updateStyle();
  };

  public setActiveBaseLayer(id: string) {
    this.activeBaseLayer = id;

    this.updateStyle();
  }

  public setActiveOverlayLayer(overlay: ActiveOverlayType) {
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

  public remove = () => {
    this.mapInstance?.remove();
  };

  private updateStyle = async () => {
    if (!this.mapInstance) {
      return;
    }

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
    this.mapInstance.setStyle(updatedStyle, { diff: true });
  };

  private extendAedLayers = (
    style: StyleSpecification,
    activeOverlays: ('247' | 'restricted')[]
  ) => {
    if (!this.mapInstance) {
      return style;
    }

    if (activeOverlays.length === 0) {
      return style;
    }

    let sourceFilter: FilterSpecification | null = null;
    if (activeOverlays.length === 1) {
      sourceFilter =
        activeOverlays[0] === '247' ? alwaysAvailableFilterOverride : restrictedFilterOverride;
    }
    const aedSource = createAedSource(MapConfiguration.aedGeoJsonUrl, sourceFilter);

    const aedPointLayers = createAedPointLayers(
      MapConfiguration.aedPointLayerId,
      MapConfiguration.aedSourceId
    );
    const aedClusterLayers = createAedClusterLayers(
      MapConfiguration.aedPointLayerId,
      MapConfiguration.aedSourceId
    );

    const cursorClickableInteraction = new CursorClickableInteraction(this.mapInstance);
    cursorClickableInteraction.setup(aedPointLayers.map(layer => layer.id));
    cursorClickableInteraction.setup(aedClusterLayers.map(layer => layer.id));

    const clusterZoomInteraction = new ClusterZoomInteraction(this.mapInstance);
    clusterZoomInteraction.setup(aedClusterLayers.map(layer => layer.id));

    const aedSelectInteraction = new AedSelectInteraction(this.mapInstance);
    aedSelectInteraction.setup(aedPointLayers.map(layer => layer.id));

    return {
      ...style,
      sources: {
        ...style.sources,
        [MapConfiguration.aedSourceId]: aedSource,
      },
      layers: [...style.layers, ...aedPointLayers, ...aedClusterLayers],
    };
  };

  private extendAedAvailabilityLayers = async (style: StyleSpecification) => {
    if (!this.mapInstance) {
      return style;
    }

    const aedData = await requestAedDataByCurrentAvailability();
    const aedSource = createAedSource(aedData);
    const aedPointLayers = createAedAvailabilityPointLayers(
      MapConfiguration.aedAvailabilityPointLayerId,
      MapConfiguration.aedAvailabilitySourceId
    );
    const aedClusterLayers = createAedClusterLayers(
      MapConfiguration.aedAvailabilityPointLayerId,
      MapConfiguration.aedAvailabilitySourceId
    );

    const cursorClickableInteraction = new CursorClickableInteraction(this.mapInstance);
    cursorClickableInteraction.setup(aedPointLayers.map(layer => layer.id));
    cursorClickableInteraction.setup(aedClusterLayers.map(layer => layer.id));

    const clusterZoomInteraction = new ClusterZoomInteraction(this.mapInstance);
    clusterZoomInteraction.setup(aedClusterLayers.map(layer => layer.id));

    const aedSelectInteraction = new AedSelectInteraction(this.mapInstance);
    aedSelectInteraction.setup(aedPointLayers.map(layer => layer.id));

    return {
      ...style,
      sources: {
        ...style.sources,
        [MapConfiguration.aedAvailabilitySourceId]: aedSource,
      },
      layers: [...style.layers, ...aedPointLayers, ...aedClusterLayers],
    };
  };
}
