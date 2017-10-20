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
}
const symbolLayout = {
  "icon-image": "marker-15",
  "text-transform": "uppercase",
  "text-field": "{name}",
  "text-anchor": "top",
  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
  "text-offset": [0, 1],
  "text-size": {
    stops: [[0, 0], [13, 0], [14, 18]]
  }
}

export const SluglinesLayer = props => {
  const {
    sluglines,
    onMouseEnterFunc,
    onMouseLeaveFunc,
    markerOnClick,
    map,
    showCluster,
    lineArr
  } = props;
  console.log("show", showCluster);
  const option = {
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50
  };
  const clusterOption = showCluster ? option : { cluster: false };

  console.log(clusterOption);
  return (
    <div>
      <GeoJSONLayer
        id="sluglines_id"
        data={sluglines}
        layerOptions={{
          filter: ["in", "line", ...lineArr]
        }}
        circleOnClick={markerOnClick}
        circleOnMouseEnter={onMouseEnterFunc}
        circleOnMouseLeave={onMouseLeaveFunc}
        circleLayout={{ visibility: "visible" }}
        circlePaint={{
          "circle-radius": {
            base: 4,
            stops: [[9, 7], [14, 22]]
          },
          "circle-color": lineColor
        }}
        sourceOptions={clusterOption}
      />
      // Layer of clustered spots
      <Layer
        id="cluster_layer"
        sourceId="sluglines_id"
        layerOptions={{
          filter: ["has", "point_count"]
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
            stops: [[0, 0], [7, 25], [10, 30]]
          }
        }}
        type="circle"
      />
      <Layer
        id="cluster_count"
        sourceId="sluglines_id"
        layerOptions={{
          filter: ["has", "point_count"]
        }}
        layout={{
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12
        }}
        type="symbol"
      />
      //show layer with labels visible from a certain zoom
      {lineArr.map((line) =>
        <Layer
          key={line}
          id={line}
          sourceId="sluglines_id"
          layerOptions={{
            filter: ["==", "line", line]
          }}
          layout={symbolLayout}
          paint={{
            "text-halo-color": lineColor,
            "text-halo-width": 20,
            "text-color": "black"
          }}
          type="symbol"
        />
      )
     }
    </div>
  );
};
