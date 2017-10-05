import PropTypes from "prop-types";
import React from "react";
import {} from "../components";
import ReactMapboxGl, {
  Layer,
  Popup,
  Marker,
  Feature,
  Cluster,
  ZoomControl,
  RotationControl
} from "react-mapbox-gl";
import {
  getBoundsArr,
  getBoundsArrFromCluster,
  getLineColor
} from "../utils/mapfunctions.js";
import { Map, clusterMarker, styles } from "../utils/mapInitialSetup.js";
import geolib from "geolib";
import geojson from "../components/MapboxComponents/stations.json";

export default class MapboxLayout extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      sluglines: this.props.showList,
      center: [-77.2524583, 38.6699513],
      zoom: [9],
      fitBounds: this.getFitBounds(this.props.showList),
      selectedSlugline: null
    };
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentDidMount() {
    const center = geolib.getCenter(this.props.showList);
    this.setState({
      fitBounds: this.getFitBounds(this.props.showList),
      center: [center.longitude, center.latitude]
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showList !== this.props.showList) {
      this.setState({
        fitBounds: this.getFitBounds(nextProps.showList)
      });
    }
  }

  markerClick = (selectedSlugline, { feature }) => {
    //Define the selected station, store it in the state
    this.setState({
      center: [selectedSlugline.longitude, selectedSlugline.latitude],
      zoom: [14.5],
      selectedSlugline
    });
  };

  clusterMarkerClick = (coordinates, getLeaves) => {
    const clusterArr = getBoundsArrFromCluster(getLeaves());
    this.setState({
      fitBounds: [
        [clusterArr.minLng, clusterArr.minLat],
        [clusterArr.maxLng, clusterArr.maxLat]
      ]
    });
  };

  onDrag = e => {
    //If a selectedSlugline is selected and user drag the map, unselect it
    if (this.state.selectedSlugline) {
      this.setState({
        selectedSlugline: null
      });
    }
  };

  onMouseEnterFunc = (cursor, selectedSlugline) => {
    //change cursor style
    this.setState({
      selectedSlugline
    });
  };

  onMouseLeaveFunc = cursor => {
    if (this.state.selectedSlugline) {
      this.setState({
        selectedSlugline: null
      });
    }
  };

  getFitBounds = sluglines => {
    const arr = getBoundsArr(sluglines);
    return [[arr.minLng, arr.minLat], [arr.maxLng, arr.maxLat]];
  };

  clusterMarker = (
    coordinates,
    pointCount: number,
    getLeaves: (
      limit?: number,
      offset?: number
    ) => Array<React.ReactElement<any>>
  ) => (
    <Marker
      id="sluglines"
      key={coordinates.toString()}
      coordinates={coordinates}
      style={styles.clusterMarker}
      onClick={this.clusterMarkerClick.bind(this, coordinates, getLeaves)}
    >
      <div>{pointCount}</div>
    </Marker>
  );

  render() {
    console.log(geojson);
    const {
      zoom,
      center,
      skip,
      fitBounds,
      selectedSlugline,
      popupShowLabel
    } = this.state;
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        zoom={zoom}
        center={center}
        onDragEnd={this.onDrag.bind(Map)}
        containerStyle={styles.container}
        fitBounds={fitBounds}
        fitBoundsOptions={{
          padding: { top: 25, bottom: 25, left: 25, right: 25 },
          maxZoom: 14,
          linear: true
        }}
      >
        <RotationControl />
        <ZoomControl zoomDiff={1} />

          <Layer type="symbol" id="marker" layout={{ "icon-image": "rail-metro" }}>
            <Feature coordinates={[-77.12911152370515, 38.79930767201779]} />
          </Layer>

        <Cluster ClusterMarkerFactory={this.clusterMarker}>
          {this.props.showList.map((slugline, i) => (
            <Marker
              key={slugline.id}
              style={styles.marker}
              data-feature={slugline}
              coordinates={[slugline.longitude, slugline.latitude]}
              onClick={this.markerClick.bind(this, slugline)}
              onMouseEnter={() => {
                this.onMouseEnterFunc("pointer", slugline);
              }}
              onMouseLeave={this.onMouseLeaveFunc.bind(this, "")}
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
        {selectedSlugline && (
          <Popup
            key={selectedSlugline.id}
            coordinates={[
              selectedSlugline.longitude,
              selectedSlugline.latitude
            ]}
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
