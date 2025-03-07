import { Map, StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import markerGreen from '../../../assets/icons/defi-map-marker-green.svg';
import markerOrange from '../../../assets/icons/defi-map-marker-orange.svg';
import { requestAedDataByCurrentAvailability } from '../../../services/aed-data.service';
import { requestStyleSpecification } from '../../../services/map-style.service';
import { MARKER_GREEN_IMAGE_ID, MARKER_ORANGE_IMAGE_ID } from './configuration/constants';
import { MapConfiguration } from './configuration/map.configuration';
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
  private mapInstance: Map;
  private activeBaseLayer: string = MapConfiguration.osmBaseMapId;
  private activeOverlay: 'default' | 'availability' = 'default';

  constructor(props: MapInstanceProps) {
    this.mapInstance = new Map({
      container: props.container,
      style: MapConfiguration.baseLayers[this.activeBaseLayer],
      center: MapConfiguration.defaultCenter,
      zoom: MapConfiguration.defaultZoom,
    });

    this.mapInstance.on('load', this.init);
  }

  public init = async () => {
    const image = new Image();
    image.src = markerGreen;
    image.onload = () => {
      this.mapInstance.addImage(MARKER_GREEN_IMAGE_ID, image);
    };

    const image2 = new Image();
    image2.src = markerOrange;
    image2.onload = () => {
      this.mapInstance.addImage(MARKER_ORANGE_IMAGE_ID, image2);
    };

    const updatedStyle = this.extendAedLayers(this.mapInstance.getStyle());
    this.mapInstance.setStyle(updatedStyle);
  };

  public setActiveBaseLayer(id: string) {
    this.activeBaseLayer = id;

    this.updateStyle();
  }

  public setActiveOverlayLayer(overlay: 'default' | 'availability') {
    this.activeOverlay = overlay;

    this.updateStyle();
  }

  public remove = () => {
    this.mapInstance.remove();
  };

  private updateStyle = async () => {
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
        : this.extendAedLayers(styleSpec);

    this.mapInstance.setStyle(updatedStyle, { diff: true });
  };

  private extendAedLayers = (style: StyleSpecification) => {
    const aedSource = createAedSource(MapConfiguration.aedGeoJsonUrl);
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

    const updatedStyle = {
      ...style,
      sources: {
        ...style.sources,
        [MapConfiguration.aedSourceId]: aedSource,
      },
      layers: [...style.layers, ...aedPointLayers, ...aedClusterLayers],
    };

    return updatedStyle;
  };

  private extendAedAvailabilityLayers = async (style: StyleSpecification) => {
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
