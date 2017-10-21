import React from "react";
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";
import { Map, styles } from "../../utils/mapInitialSetup.js";

const lineColor = {
  property: "line",
  type: "categorical",
  stops: [
    ["Springfield/Lorton Lines", "#ffff00"],
    ["Woodbridge/Dale City", "#cd6090"],
    ["Stafford Lines", "#f08080"],
    ["Fredericksburg Lines", "#8470ff"],
    ["I-66/Manassas Lines", "#5d478b"],
    ["Washington DC Lines", "#3cb371"]
  ]
};
const symbolLayout = {
  "icon-image": "car-15",
  "icon-size": {
    stops: [[13, 0], [14, 2]]
  },
  "icon-allow-overlap": true,
  "text-allow-overlap": false,
  "text-transform": "uppercase",
  "text-field": "{name}",
  "text-anchor": "top",
  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
  "text-offset": [0, 0.5],
  "text-size": {
    stops: [[0, 0], [13, 0], [14, 18]]
  }
};

export const SluglinesLayer = props => {
  const {
    sluglines,
    onMouseEnterFunc,
    onMouseLeaveFunc,
    markerOnClick,
    map,
    showCluster,
    selectedLines,
    lineArr
  } = props;
  const sourceOption = {
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50
  };
  const clusterOption = showCluster ? sourceOption : { cluster: false };

  return (
    <div>
      <GeoJSONLayer
        id="sluglineGeoJSON"
        data={sluglines}
        layerOptions={{
          filter: ["in", "line", ...selectedLines]
        }}
        circleOnClick={markerOnClick}
        circleOnMouseEnter={onMouseEnterFunc}
        circleOnMouseLeave={onMouseLeaveFunc}
        symbolOnMouseEnter={onMouseEnterFunc}
        symbolOnMouseLeave={onMouseLeaveFunc}
        circleLayout={{ visibility: "visible" }}
        circlePaint={{
          "circle-radius": {
            base: 4,
            stops: [[9, 6], [14, 0]]
          },
          "circle-color": lineColor
        }}
        symbolLayout={symbolLayout}
        symbolPaint={{
          "text-halo-color": lineColor,
          "text-halo-width": 20,
          "text-color": "black"
        }}
        fillPaint={{
          "fill-color": "#f08",
          "fill-opacity": 1
        }}
        sourceOptions={clusterOption}
      />
      // Layer of clustered spots
      {showCluster &&
        <div>
          <Layer
            id="cluster_layer"
            sourceId="sluglineGeoJSON"
            layerOptions={{
              filter: [
                "any",
                ["in", "line", ...selectedLines],
                ["has", "point_count"]
              ]
            }}
            paint={{
              "circle-color": {
                property: "point_count",
                type: "interval",
                stops: [[0, "#51bbd6"], [5, "#f1f075"], [10, "#f28cb1"]]
              },
              "circle-radius": {
                property: "point_count",
                type: "interval",
                stops: [[2, 20], [7, 25], [10, 30]]
              }
            }}
            type="circle"
          />
          <Layer
            id="cluster_count"
            sourceId="sluglineGeoJSON"
            layerOptions={{
              filter: [
                "any",
                ["in", "line", ...selectedLines],
                ["has", "point_count"]
              ]
            }}
            layout={{
              "text-field": "{point_count_abbreviated}",
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12
            }}
            type="symbol"
          />
        </div>
      }
      //show layer with labels visible from a certain zoom
    </div>
  );
};
