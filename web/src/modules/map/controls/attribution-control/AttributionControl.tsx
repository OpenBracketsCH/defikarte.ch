import { MapConfiguration } from '../../map-instance/configuration/map.configuration';
import { MapInstance } from '../../map-instance/map-instance';

type Props = {
  map: MapInstance | null;
  activeBaseLayer: string;
};

export const AttributionControl = ({ activeBaseLayer }: Props) => {
  const isSwisstopoLayerActive =
    activeBaseLayer === MapConfiguration.swisstopoBaseMapId ||
    activeBaseLayer === MapConfiguration.swisstopoImageryBaseMapId;
  return (
    <div
      className="absolute bottom-0 left-4 px-1 bg-primary-80-white rounded-t-sm flex items-center"
      style={{ zIndex: 100000 }}
    >
      <div className="flex items-center text-graustufen-grau-e">
        <a
          href="https://maplibre.org/"
          target="_blank"
          className="text-[8px] md:text-[10px] p-0 m-0 "
        >
          MapLibre
        </a>
        <span className="text-[8px] md:text-[10px] mx-1">|</span>
        <a
          href="https://www.openstreetmap.org"
          target="_blank"
          className="text-[8px] md:text-[10px]"
        >
          © OpenStreetMap contributors
        </a>
        {isSwisstopoLayerActive && (
          <>
            <span className="text-[8px] md:text-[10px] mx-1">|</span>
            <a target="_blank" className="text-[8px] md:text-[10px]">
              © swisstopo
            </a>
          </>
        )}
      </div>
    </div>
  );
};
