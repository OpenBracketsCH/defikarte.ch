import { LayerId } from '../../../model/map';
import { AedClusterLayer } from '../map-instance/layers/aed-layers/AedClusterLayer';
import { filterByOpeningHours } from '../map-instance/layers/aed-layers/aed-filter';
import { OsmLayer } from '../map-instance/layers/base-layers/OsmLayer';
import { SwisstopoLayer } from '../map-instance/layers/base-layers/SwisstopoLayer';
import {
  clusterAvailabillityPointStyle,
  clusterPointStyle,
} from '../map-instance/styles/aed-point.style';

export class MapConfiguration {
  public static layerGroups: LayerId[][] = [
    [LayerId.OsmSwiss, LayerId.OsmCommon, LayerId.Swisstopo, LayerId.Satellite],
    [LayerId.Aed247, LayerId.AedByOpeningHours],
    [LayerId.AedRestricted, LayerId.AedByOpeningHours],
  ];

  public static defaultLayers: LayerId[] = [
    LayerId.OsmSwiss,
    LayerId.Aed247,
    LayerId.AedRestricted,
  ];

  public static createOsmSwissLayer = () => {
    return new OsmLayer('https://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png');
  };

  public static createOsmCommonLayer = () => {
    return new OsmLayer();
  };

  public static createSwisstopoLayer = () => {
    return new SwisstopoLayer('ch.swisstopo.pixelkarte-grau');
  };

  public static createSatelliteLayer = () => {
    return new SwisstopoLayer('ch.swisstopo.swissimage');
  };

  public static createAed247Layer = () => {
    return new AedClusterLayer({
      minZoom: 0,
      maxZoom: 20,
      dataFilter: filterByOpeningHours('247'),
      style: clusterPointStyle,
      zIndex: 11,
    });
  };

  public static createAedRestrictedLayer = () => {
    return new AedClusterLayer({
      minZoom: 0,
      maxZoom: 20,
      dataFilter: filterByOpeningHours('day'),
      style: clusterPointStyle,
      zIndex: 10,
    });
  };

  public static createAedByOpeningHoursLayer = () => {
    return new AedClusterLayer({
      minZoom: 0,
      maxZoom: 20,
      style: clusterAvailabillityPointStyle,
    });
  };
}
