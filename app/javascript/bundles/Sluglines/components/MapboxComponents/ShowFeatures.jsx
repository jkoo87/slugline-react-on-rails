import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const symbolLayout: MapboxGL.SymbolLayout = {
  'icon-image':'{marker-symbol}',
  'icon-size': 1,
  'icon-allow-overlap': false,
  'text-allow-overlap': false,
  // 'text-field': '{name}',
  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  'text-offset': [0, 0.6],
  'text-anchor': 'top',
};

const symbolPaint: MapboxGL.SymbolPaint = {
  'text-color': 'gold'
};
export const ShowFeatures = props => {
  return (
    <div>
      <Layer type="symbol" id="metro" layout={symbolLayout}>
        {props.geojson.features.map((feature, i) =>
            <Feature
              key={i}
              properties={feature.properties}
              coordinates={feature.geometry.coordinates}
            />
        )}
      </Layer>
    </div>
  );
};
