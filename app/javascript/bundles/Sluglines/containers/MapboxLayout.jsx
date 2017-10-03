import PropTypes from "prop-types";
import React from "react";
import {} from "../components";
import ReactMapboxGl, { Layer, Feature, Popup, Marker, Cluster } from "react-mapbox-gl";
import {
  getBoundsArr,
  getLineColor
} from "../utils/mapfunctions.js";
import { Map, clusterMarker, styles } from "../utils/mapInitialSetup.js";
import geolib from "geolib"

export default class MapboxLayout extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      sluglines: this.props.showList,
      center: [-77.2524583, 38.6699513],
      zoom: [9],
      skip: 0,
      selectedSlugline: this.props.selectedSlugline,
      popupShowLabel: true
    };
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  markerClick = (selectedSlugline, { feature }) => {
    //Define the selected station, store it in the state
    this.setState({
      center:[selectedSlugline.longitude, selectedSlugline.latitude],
      zoom: [14],
      selectedSlugline
    });
  };

  popupChange = popupShowLabel => {
    this.setState({ popupShowLabel });
  };

  onDrag = () => {
    //If a selectedSlugline is selected and user drag the map, unselect it
    if (this.state.selectedSlugline) {
      this.setState({
        selectedSlugline: null
      });
    }
  };

  onMouseEnterFunc = (cursor, selectedSlugline, { map }) => {
    //change cursor style
    this.setState({
      selectedSlugline
    });
  };

  onMouseLeaveFunc = (cursor, { map }) => {
    this.onDrag();
  };

  clusterMarker = (coordinates, pointCount: number) => (
    <Marker
      key={coordinates.toString()}
      coordinates={coordinates}
      style={styles.clusterMarker}
    >
      <div>{pointCount}</div>
    </Marker>
  );

  render() {
    const test = getBoundsArr(this.props.showList)
    const what = [[test.minLng, test.minLat], [test.maxLng, test.maxLat]]



    const { zoom, center, skip, selectedSlugline, popupShowLabel } = this.state;
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        zoom={zoom}
        center={center}
        onDrag={this.onDrag}
        containerStyle={styles.container}
        fitBounds={what}

      >
        <Cluster ClusterMarkerFactory={this.clusterMarker}>
          {this.props.showList.map((slugline, i) => (
            <Marker
              key={slugline.id}
              style={styles.marker}
              data-feature={slugline}
              coordinates={[slugline.longitude, slugline.latitude]}
              onClick={this.markerClick.bind(this, slugline)}
              onMouseEnter={this.onMouseEnterFunc.bind(
                this,
                "pointer",
                slugline
              )}
              onMouseLeave={this.onMouseLeaveFunc.bind(this, "")}
            >
              <div
                style={{
                  backgroundColor: getLineColor(slugline.line),
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
        {selectedSlugline && (
          <Popup
            key={selectedSlugline.id}
            coordinates={[selectedSlugline.longitude, selectedSlugline.latitude]}
            offset={[0, -50]}
            style={styles.popup}
          >
            <div>{selectedSlugline.name}</div>
          </Popup>
        )}
      </Map>
    );
  }
}
