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
import equal from "deep-equal";
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
      fitBounds: [[-77.563849, 38.290004], [-77.003483, 38.901999]],
      showCluster: false,
      hasAddedSource: false,
      map: null,
      popup: new MapboxGL.Popup({
        closeButton: true,
        closeOnClick: true
      })
    };
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        fitBounds: this.getFitBounds(this.props.sluglines)
      });
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {

    if (
      this.state.hasAddedSource &&
      nextProps.filteredFeatures.length &&
      !nextProps.filteredLineFitBound.length
    ) {
      console.log("filteredFeatures");
      const map = this.state.map;
      const bounds = new MapboxGL.LngLatBounds();
      const filteredFeatures = map.getSource("sluglineGeoJSON").setData({
        type: "FeatureCollection",
        features: nextProps.filteredFeatures
      });
      filteredFeatures._data.features.forEach(feature =>
        bounds.extend(feature.geometry.coordinates)
      );
      // map.fitBounds(bounds)
      this.setState({ fitBounds: bounds });
    } else if (
      this.state.hasAddedSource &&
      nextProps.filteredLineFitBound.length &&
      !equal(nextProps.filteredLineFitBound, this.props.filteredLineFitBound)
    ) {
      console.log("filteredLineFitBound!");
      const bounds = new MapboxGL.LngLatBounds();
      nextProps.filteredLineFitBound.forEach(feature =>
        bounds.extend(feature.geometry.coordinates)
      );
      this.setState({ fitBounds: bounds });
    } else {
      this.setState({ fitBounds: null });
    }

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
        geojsonlayer: ["sluglineGeoJSON"],
        filter: ["in", "line", ...selectedLines]
      });
      const test = filterDuplicates(query);
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
    // if (this.state.selectedSlugline) {
    //   this.setState({
    //
    //   });
    // }
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
    // this.state.popup.remove();
  };

  getFitBounds = sluglines => {
    const arr = getBoundsArr(sluglines);
    console.log(arr);
    return [[arr.minLng, arr.minLat], [arr.maxLng, arr.maxLat]];
  };

  clusterToggle = e => {
    this.setState({ showCluster: !this.state.showCluster });
    this.state.map.getSource("sluglineGeoJSON").setData({
      type: "FeatureCollection",
      features: this.props.filteredFeatures
    });
  };

  render() {
    const {
      zoom,
      center,
      fitBounds,
      showCluster,
      hasAddedSource,
      map
    } = this.state;
    const { sluglines, selectedLines } = this.props;

    return (
      <div>
        <div>
          Show Cluster<button onClick={this.clusterToggle}>
            {showCluster ? "ON" : "OFF"}
          </button>
        </div>
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
      </div>
    );
  }
}
