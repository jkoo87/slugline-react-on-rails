import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { styles } from "../../utils/mapInitialSetup.js";

export const SluglinesLayer = props => {
  return (
    <Layer
      type="circle"
      id="sluglines"
      paint={{
        "circle-radius": 8,
        "circle-color": "rgba(55,148,179,1)"
      }}
    >
      {props.showList.map((slugline, i) => (
        <Feature
          key={slugline.id}
          style={styles.marker}
          data-feature={slugline}
          coordinates={[slugline.longitude, slugline.latitude]}
          onClick={props.markerClick.bind(this, slugline)}
          onMouseEnter={() => {
            props.onMouseEnterFunc("pointer", slugline);
          }}
          onMouseLeave={props.onMouseLeaveFunc.bind(this, "")}
        >
          <div
            style={{
              backgroundColor: slugline.color,
              padding: "5px 8px",
              borderRadius: "50%"
            }}
            title={slugline.name}
          >
            SL
          </div>
        </Feature>
      ))}
    </Layer>
  );
};
