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
import {
  ShowFeatures,
  SluglinesCluster,
  SluglinesLayer
} from "../components/MapboxComponents";

export default class MapboxLayout extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      sluglines: this.props.showList,
      center: [-77.2524583, 38.6699513],
      zoom: [9],
      showCluster: false,
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
      console.log("new fitBounds")
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

  onMove = e => {
    const { zoom } = this.state;
    const zoomOnMove = e.getZoom().toFixed(2);
    const newState= zoomOnMove < 9 ?{showCluster: true}:{showCluster: false};
    this.setState(newState);
  };

  onDrag = e => {
    console.log(e.queryRenderedFeatures(e.point, { layers: ["metro"] }));
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

  clusterMarker = (coordinates, pointCount, getLeaves) => (
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
    const {
      zoom,
      center,
      skip,
      fitBounds,
      selectedSlugline,
      popupShowLabel,
      showCluster
    } = this.state;
    const sluglinesCluster = (
      <SluglinesCluster
        showList={this.props.showList}
        clusterMarker={this.clusterMarker}
        clusterMarkerClick={this.clusterMarkerClick}
        markerClick={this.markerClick}
        onMouseEnterFunc={this.onMouseEnterFunc}
        onMouseLeaveFunc={this.onMouseLeaveFunc}
      />
    );
    const sluglinesLayer = (
      <SluglinesLayer
        showList={this.props.showList}
        clusterMarker={this.clusterMarker}
        clusterMarkerClick={this.clusterMarkerClick}
        markerClick={this.markerClick}
        onMouseEnterFunc={this.onMouseEnterFunc}
        onMouseLeaveFunc={this.onMouseLeaveFunc}
      />
    );
    const showSluglines = showCluster ? sluglinesCluster : sluglinesLayer;

    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        zoom={zoom}
        center={center}
        onDragEnd={this.onDrag}
        containerStyle={styles.container}
        fitBounds={fitBounds}
        onMove={this.onMove}
        fitBoundsOptions={{
          padding: { top: 25, bottom: 25, left: 25, right: 25 },
          maxZoom: 14,
          linear: true
        }}
      >
        <RotationControl />
        <ZoomControl zoomDiff={1} />

        {showSluglines}
        <ShowFeatures geojson={geojson} />

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
