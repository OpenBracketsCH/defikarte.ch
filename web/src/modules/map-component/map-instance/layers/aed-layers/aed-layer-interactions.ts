import { click } from "ol/events/condition";
import Select from "ol/interaction/Select";
import { selectedPointStyle } from "../../styles/aed-point.style";
import Layer from "ol/layer/Layer";
import { Source } from "ol/source";
import LayerRenderer from "ol/renderer/Layer";
import { Point } from "ol/geom";
import { Feature } from "ol";
import Interaction from "ol/interaction/Interaction";

export const selectInteraction = (
  layers?: Layer<Source, LayerRenderer<any>>[],
  callback?: (selected: Feature<Point>[]) => void
): Interaction => {
  const selectFeaturesInteraction = new Select({
    layers: layers,
    condition: click,
    style: selectedPointStyle,
    filter: (feature) => {
      return feature.getProperties().features?.length === 1;
    },
  });

  selectFeaturesInteraction.on("select", (e) => {
    let features: Feature<Point>[] = [];
    if (e.selected.length > 0) {
      features = e.selected[0].getProperties().features;
    }

    if (callback) {
      callback(features);
    }
  });
  return selectFeaturesInteraction;
};
