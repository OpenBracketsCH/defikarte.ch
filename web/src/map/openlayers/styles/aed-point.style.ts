import { FeatureLike } from "ol/Feature";
import { asArray } from "ol/color";
import { Circle, Fill, Icon, Stroke, Style, Text } from "ol/style";
import marker from "../assets/marker.png";

const dayStrokeColor = "orange";
const dayFillColor = "#449847";
const dayNightStrokeColor = "#71c174";
const dayNightFillColor = "#449847";

const clusterStrokeColor = "#ffffff";
const clusterFillColor = "#008000";
const clusterTextColor = "#ffffff";

const clusterColor = () => {
  const colorArr = asArray(clusterFillColor).slice();
  colorArr[3] = 0.8;
  return colorArr;
};

const clusterRadiusSize = (countFeatures: number) => {
  if (countFeatures < 10) {
    return clusterStylePart10;
  }
  if (countFeatures < 50) {
    return clusterStylePart20;
  }
  if (countFeatures < 200) {
    return clusterStylePart30;
  }
  if (countFeatures < 100) {
    return clusterStylePart40;
  }

  return clusterStylePart50;
};

const pointDayStylePart = {
  stroke: new Stroke({
    color: dayStrokeColor,
    width: 2,
  }),
  fill: new Fill({
    color: dayFillColor,
  }),
};

const point247StylePart = {
  stroke: new Stroke({
    color: dayNightStrokeColor,
    width: 2,
  }),
  fill: new Fill({
    color: dayNightFillColor,
  }),
};

const clusterPointStylePart = {
  stroke: new Stroke({
    color: clusterStrokeColor,
    width: 3,
  }),
  fill: new Fill({
    color: clusterColor(),
  }),
};

const pointTextStylePart = {
  stroke: new Stroke({ color: "#000fff" }),
  fill: new Fill({
    color: clusterTextColor,
  }),
  font: "14px sans-serif",
};

const aedIcon = new Style({
  image: new Icon({
    src: marker,
    scale: 0.25,
  }),
});

const pointDayStyle = new Style({
  image: new Circle({
    radius: 15,
    ...pointDayStylePart,
  }),
});

const point247Style = new Style({
  image: new Circle({
    radius: 15,
    ...point247StylePart,
  }),
});

const simplifiedPointStyle = new Style({
  image: new Circle({
    radius: 10,
    ...point247StylePart,
  }),
});

const clusterStylePart10 = {
  image: new Circle({
    radius: 12,
    ...clusterPointStylePart,
  }),
};

const clusterStylePart20 = {
  image: new Circle({
    radius: 15,
    ...clusterPointStylePart,
  }),
};

const clusterStylePart30 = {
  image: new Circle({
    radius: 18,
    ...clusterPointStylePart,
  }),
};

const clusterStylePart40 = {
  image: new Circle({
    radius: 21,
    ...clusterPointStylePart,
  }),
};

const clusterStylePart50 = {
  image: new Circle({
    radius: 24,
    ...clusterPointStylePart,
  }),
};

export const pointStyle = (
  features: FeatureLike,
  resolution: number
): Style[] => {
  const style =
    features.getProperties().opening_hours === "24/7"
      ? point247Style
      : pointDayStyle;

  return [style, aedIcon];
};

export const clusterPointStyle = (
  features: FeatureLike,
  resolution: number
): Style[] | void => {
  const clusterFeatures = features.get("features");

  if (clusterFeatures.length == 1) {
    return pointStyle(clusterFeatures[0], resolution);
  }

  let text: Text = new Text({
    text: clusterFeatures.length.toString(),
    ...pointTextStylePart,
  });

  const stylePart = clusterRadiusSize(clusterFeatures.length);
  const style = new Style({
    ...stylePart,
    text: text,
  });

  return [style];
};

export const selectedPointStyle = (
  features: FeatureLike,
  resolution: number
) => {
  const selectedStyle = new Style({
    image: new Circle({
      radius: 17,
      stroke: new Stroke({
        color: "#0066ff",
        width: 3,
      }),
    }),
  });

  const selectedOuterStyle = new Style({
    image: new Circle({
      radius: 20,
      stroke: new Stroke({
        color: "#ffffff",
        width: 3,
      }),
    }),
  });

  const clusterStyle = clusterPointStyle(features, resolution);
  if (clusterStyle) {
    return [selectedOuterStyle, selectedStyle, ...clusterStyle];
  }
  return [
    selectedOuterStyle,
    selectedStyle,
    ...pointStyle(features, resolution),
  ];
};
