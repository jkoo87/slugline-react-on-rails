import PropTypes from "prop-types";
import React from "react";
import {} from "../components";
import ReactMapboxGl, {
  Layer,
  ZoomControl,
  RotationControl
} from "react-mapbox-gl";
import {
  getBoundsArr,
  getBoundsArrFromCluster
} from "../utils/mapfunctions.js";
import { Map, clusterMarker, styles } from "../utils/mapInitialSetup.js";
import * as MapboxGL from "mapbox-gl";
import geolib from "geolib";
import geojson from "../components/MapboxComponents/stations.json";
import { ShowFeatures, SluglinesLayer } from "../components/MapboxComponents";
import { filterDuplicates } from "../utils/filter.js";

export default class MapboxLayout extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      zoom: [9],
      fitBounds: this.getFitBounds(this.props.sluglines),
      showCluster: false,
      hasAddedSource: false,
      map: null,
      popup: new MapboxGL.Popup({
        closeButton: false,
        closeOnClick: false
      })
    };
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentDidMount() {
    // const center = geolib.getCenter(this.props.sluglines);
    // console.log(geolib.getCenter(this.props.sluglines))
    // this.setState({
    //   fitBounds: this.getFitBounds(this.props.sluglines),
    //   center: [center.longitude, center.latitude]
    // });
  }

  handleListFilter = line_id => {
    // const map = this.state.map;
    // const id = line_id;
    // console.log("id", id);
    // console.log("visible?", map.getLayoutProperty(id + "-circle", "visibility"))
    // const visibility = map.getLayoutProperty(id + "-circle", "visibility");
    // if (visibility === "visible") {
    //   map.setLayoutProperty(id + "-circle", "visibility", "none");
    //   map.setLayoutProperty(id + "-symbol", "visibility", "none");
    // } else {
    //   map.setLayoutProperty(id + "-circle", "visibility", "visible");
    //   map.setLayoutProperty(id + "-symbol", "visibility", "visible");
    // }
  };

  markerOnClick = e => {
    console.log("click");
    this.state.map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: [14.5]
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

  onMoveEnd = map => {
    const selectedLines = this.props.selectedLines;
    if (this.state.hasAddedSource) {
      const query = map.queryRenderedFeatures({
        geojsonlayer: ["Washington DC Lines-circle"],
        filter: ["in", "line", ...selectedLines]
      });
      console.log(filterDuplicates(query));
    }
  };
  onMove = map => {
    const zoomOnMove = map.getZoom().toFixed(2);
    const newState =
      zoomOnMove < 8.5 ? { showCluster: true } : { showCluster: false };
    if (zoomOnMove < 9) {
      console.log("nononono");
      this.setState(newState);
    }
  };

  onDrag = e => {
    //If a selectedSlugline is selected and user drag the map, unselect it
    if (this.state.selectedSlugline) {
      this.setState({
        selectedSlugline: null
      });
    }
  };

  onMouseEnterFunc = e => {
    console.log(e);
    this.state.map.getCanvas().style.cursor = "pointer";
    const feature = e.features[0];
    this.state.popup
      .setLngLat(feature.geometry.coordinates)
      .setText(feature.properties.name)
      .addTo(this.state.map);
  };

  onMouseLeaveFunc = cursor => {
    this.state.map.getCanvas().style.cursor = "";
    this.state.popup.remove();
  };

  getFitBounds = sluglines => {
    const arr = getBoundsArr(sluglines);
    console.log(arr);
    return [[arr.minLng, arr.minLat], [arr.maxLng, arr.maxLat]];
  };

  render() {
    console.log("selectedLine", this.props.selectedLine);
    const {
      zoom,
      center,
      fitBounds,
      showCluster,
      hasAddedSource,
      map
    } = this.state;
    const { sluglines, selectedLines, selectedLine, lineArr } = this.props;
    return (
      <Map
        onStyleLoad={map => {
          map.addSource("sluglinesSource", {
            type: "geojson",
            data: sluglines
          });
          this.setState({ hasAddedSource: true, map: map });
        }}
        style="mapbox://styles/mapbox/streets-v9"
        zoom={zoom}
        onDragEnd={this.onDrag}
        containerStyle={styles.container}
        fitBounds={fitBounds}
        onMoveEnd={this.onMoveEnd}
        fitBoundsOptions={{
          padding: { top: 25, bottom: 25, left: 25, right: 25 },
          maxZoom: 14,
          linear: true
        }}
      >
        <RotationControl />
        <ZoomControl zoomDiff={1} />

        {hasAddedSource && (
          <SluglinesLayer
            sluglines={this.props.sluglines}
            markerOnClick={this.markerOnClick}
            onMouseEnterFunc={this.onMouseEnterFunc}
            onMouseLeaveFunc={this.onMouseLeaveFunc}
            map={map}
            showCluster={showCluster}
            selectedLines={selectedLines}
          />
        )}
        <ShowFeatures geojson={geojson} />
      </Map>
    );
  }
}
