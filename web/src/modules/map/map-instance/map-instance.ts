import { Map, StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import markerGreen from '../../../assets/icons/defi-map-marker-green.svg';
import markerOrange from '../../../assets/icons/defi-map-marker-orange.svg';
import { requestAedDataByCurrentAvailability } from '../../../services/aed-data.service';
import { MARKER_GREEN_IMAGE_ID, MARKER_ORANGE_IMAGE_ID } from './configuration/constants';
import { MapConfiguration } from './configuration/map.configuration';
import { createAedAvailabilityPointLayers } from './layers/aed-availability-point.layer';
import { createAedClusterLayers } from './layers/aed-cluster.layer';
import { createAedPointLayers } from './layers/aed-point.layer';
import { createAedSource } from './sources/aed.source';

type MapInstanceProps = {
  container: string | HTMLElement;
};

export class MapInstance {
  private mapInstance: Map;
  private selectedFeatureId: number | null = null;
  // private activeOverlays: string[] = [];

  constructor(props: MapInstanceProps) {
    this.mapInstance = new Map({
      container: props.container,
      style: MapConfiguration.defaultStyle,
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

    console.log('Map loaded');

    const updatedStyle = this.extendAedLayers(this.mapInstance.getStyle());
    this.mapInstance.setStyle(updatedStyle);

    /*
    this.mapInstance.on('mouseenter', LayerConfiguration.aedLayerId, () => {
      this.mapInstance.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    this.mapInstance.on('mouseleave', LayerConfiguration.aedLayerId, () => {
      this.mapInstance.getCanvas().style.cursor = '';
    });

    this.mapInstance.on('mouseenter', 'cluster-point', () => {
      this.mapInstance.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    this.mapInstance.on('mouseleave', 'cluster-point', () => {
      this.mapInstance.getCanvas().style.cursor = '';
    });

    this.mapInstance.on('click', e => {
      const features = this.mapInstance.queryRenderedFeatures(e.point, {
        layers: [LayerConfiguration.aedLayerId],
      });

      if (features.length === 0) {
        if (this.selectedFeatureId) {
          this.mapInstance.setFeatureState(
            {
              source: LayerConfiguration.aedLayerSource,
              id: this.selectedFeatureId,
            },
            { selected: false }
          );
        }
      }
    });

    this.mapInstance.on('click', LayerConfiguration.aedLayerId, async e => {
      if (!e || !e.features) {
        return;
      }

      const zoom = this.mapInstance.getZoom();
      this.mapInstance.easeTo({
        center: e.features[0].toJSON()['geometry']['coordinates'],
        zoom,
      });

      const featureId = e.features[0].id;
      if (this.selectedFeatureId) {
        this.mapInstance.setFeatureState(
          {
            source: LayerConfiguration.aedLayerSource,
            id: this.selectedFeatureId,
          },
          { selected: false }
        );
      }
      this.mapInstance.setFeatureState(
        { source: LayerConfiguration.aedLayerSource, id: featureId },
        { selected: true }
      );

      this.selectedFeatureId = (featureId as number) ?? null;
    });

    this.mapInstance.on('click', 'cluster-point', async e => {
      const features = this.mapInstance.queryRenderedFeatures(e.point, {
        layers: ['cluster-point'],
      });
      const clusterId = features[0].properties.cluster_id;
      const zoom = await (
        this.mapInstance.getSource(LayerConfiguration.aedLayerSource) as GeoJSONSource
      )?.getClusterExpansionZoom(clusterId);
      this.mapInstance.easeTo({
        center: features[0].toJSON()['geometry']['coordinates'],
        zoom,
      });
    });
    */
  };

  /*

  public setBaseLayer = async (layerId: string) => {
    let layerStyle = MapConfiguration.baseLayers[layerId];

    if (!layerStyle) {
      return;
    }

    // todo: aed layers have to be added dynamically
    layerStyle = await this.applyActiveOverlays(layerStyle);
    this.mapInstance.setStyle(layerStyle, { diff: true });
  };

  private applyActiveOverlays = async (
    layerStyle: string | StyleSpecification
  ): Promise<StyleSpecification> => {
    let styleSpec: StyleSpecification | null = null;
    if (typeof layerStyle === 'string') {
      styleSpec = await requestStyleSpecification(layerStyle);
    } else {
      styleSpec = layerStyle;
    }

    if (!styleSpec) {
      return { layers: {}, sources: {}, version: 8 } as StyleSpecification;
    }

    return {
      ...styleSpec,
      sources: {
        ...styleSpec.sources,
        [LayerConfiguration.aedLayerSource]: MapConfiguration.aedSourceSpec,
      },
      layers: [...styleSpec.layers, ...createAedAvailableLayerSpec()],
    } as StyleSpecification;
  };*/

  public remove = () => {
    this.mapInstance.remove();
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

    const updatedStyle = {
      ...style,
      sources: {
        ...style.sources,
        [MapConfiguration.aedSourceId]: aedSource,
      },
      layers: [...style.layers, ...aedPointLayers, ...aedClusterLayers],
    };

    console.log(updatedStyle);
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
