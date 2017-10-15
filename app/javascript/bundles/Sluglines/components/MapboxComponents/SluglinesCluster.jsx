import React from "react";
import ReactMapboxGl, { Cluster, Marker } from "react-mapbox-gl";
import { styles } from "../../utils/mapInitialSetup.js";

export const SluglinesCluster = props => {
  return (
    <Cluster ClusterMarkerFactory={props.clusterMarker} >
      {props.showList.map((slugline, i) => (
        <Marker
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
        </Marker>
      ))}
    </Cluster>
  );
};
