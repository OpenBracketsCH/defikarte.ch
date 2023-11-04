import { FeatureLike } from "ol/Feature";
import { asArray } from "ol/color";
import { Circle, Fill, Icon, Stroke, Style, Text } from "ol/style";
import marker from "../../../../assets/marker.png";
import opening_hours from "opening_hours";

const dayStrokeColor = "orange";
const dayFillColor = "#449847";
const dayNightStrokeColor = "#71c174";
const dayNightFillColor = "#449847";
const unavailableStrokeColor = "#aaaaaa";
const unavailableFillColor = "#449847";

const clusterStrokeColor = "#ffffff";
const clusterFillColor = "#008000";
const clusterTextColor = "#ffffff";
const clusterDayStrokeColor = "orange";

const clusterColor = () => {
  const colorArr = asArray(clusterFillColor).slice();
  colorArr[3] = 0.8;
  return colorArr;
};

const clusterRadiusSize = (countFeatures: number, is247Style: boolean) => {
  let style = null;
  if (is247Style) {
    style = clusterStyleParts
      .sort((a, b) => b.count - a.count)
      .find((x) => x.count <= countFeatures)?.style;
  } else {
    style = clusterDayStyleParts
      .sort((a, b) => b.count - a.count)
      .find((x) => x.count <= countFeatures)?.style;
  }

  return style;
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

const pointUnavailableStylePart = {
  stroke: new Stroke({
    color: unavailableStrokeColor,
    width: 2,
  }),
  fill: new Fill({
    color: unavailableFillColor,
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

const clusterDayPointStylePart = {
  stroke: new Stroke({
    color: clusterDayStrokeColor,
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

const pointUnavailableStyle = new Style({
  image: new Circle({
    radius: 15,
    ...pointUnavailableStylePart,
  }),
});

const point247Style = new Style({
  image: new Circle({
    radius: 15,
    ...point247StylePart,
  }),
});

const clusterRadius = [
  { count: 0, radius: 12 },
  { count: 10, radius: 15 },
  { count: 50, radius: 18 },
  { count: 100, radius: 21 },
  { count: 200, radius: 24 },
];

const clusterStyleParts = clusterRadius.map((x) => {
  return {
    count: x.count,
    style: {
      image: new Circle({
        radius: x.radius,
        ...clusterPointStylePart,
      }),
    },
  };
});

const clusterDayStyleParts = clusterRadius.map((x) => {
  return {
    count: x.count,
    style: {
      image: new Circle({
        radius: x.radius,
        ...clusterDayPointStylePart,
      }),
    },
  };
});

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

export const pointStyleByAvailabillity = (
  features: FeatureLike,
  resolution: number
): Style[] => {
  const openingHours = features.getProperties().opening_hours;
  let isOpen = false;
  if (openingHours) {
    try {
      const oh = new opening_hours(
        features.getProperties().opening_hours || ""
      );
      isOpen = oh.getState();
    } catch (error) {
      console.error(error);
    }
  }

  const style = isOpen ? point247Style : pointUnavailableStyle;

  return [style, aedIcon];
};

export const clusterPointStyle = (
  features: FeatureLike,
  resolution: number
): Style[] | void => {
  const clusterFeatures = features.get("features");

  if (clusterFeatures.length === 1) {
    return pointStyle(clusterFeatures[0], resolution);
  }

  let text: Text = new Text({
    text: clusterFeatures.length.toString(),
    ...pointTextStylePart,
  });

  const stylePart = clusterRadiusSize(clusterFeatures.length, true);
  const style = new Style({
    ...stylePart,
    text: text,
  });

  return [style];
};

export const clusterAvailabillityPointStyle = (
  features: FeatureLike,
  resolution: number
): Style[] | void => {
  const clusterFeatures = features.get("features");

  if (clusterFeatures.length === 1) {
    return pointStyleByAvailabillity(clusterFeatures[0], resolution);
  }

  let text: Text = new Text({
    text: clusterFeatures.length.toString(),
    ...pointTextStylePart,
  });

  const stylePart = clusterRadiusSize(clusterFeatures.length, true);
  const style = new Style({
    ...stylePart,
    text: text,
  });

  return [style];
};

export const clusterDayPointStyle = (
  features: FeatureLike,
  resolution: number
): Style[] | void => {
  const clusterFeatures = features.get("features");

  if (clusterFeatures.length === 1) {
    return pointStyle(clusterFeatures[0], resolution);
  }

  let text: Text = new Text({
    text: clusterFeatures.length.toString(),
    ...pointTextStylePart,
  });

  const stylePart = clusterRadiusSize(clusterFeatures.length, false);
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
