import React from "react";
import ReactMapboxGl, { GeoJSONLayer, Layer } from "react-mapbox-gl";
import * as MapboxGL from 'mapbox-gl';
import { Map, clusterMarker, styles } from "../../utils/mapInitialSetup.js";

const symbolLayout: MapboxGL.SymbolLayout = {
  'text-field': '{name}',
  'icon-image':'{marker-symbol}',
  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  'text-offset': [0, 0.6],
  'text-anchor': 'top'
};
const symbolPaint: MapboxGL.SymbolPaint = {
  'text-color': 'black'
};

const circleLayout: MapboxGL.CircleLayout = { visibility: 'visible' };
const circlePaint: MapboxGL.CirclePaint = {
  'circle-color': 'gold'
};

var popup = new MapboxGL.Popup({
  closeButton: false
});


export const NearByLayer = props => {
  return (
    <div>
      <GeoJSONLayer
        type="symbol"
        id="metro"
        data={props.geojson}
        circleLayout={circleLayout}
        circlePaint={circlePaint}
        circleOnMouseEnter={onClickCircle}
        symbolLayout={symbolLayout}
        symbolPaint={symbolPaint}
      />

    </div>
  );
};
