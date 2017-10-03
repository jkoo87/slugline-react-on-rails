import PropTypes from "prop-types";
import React from "react";
import {} from "../components";
import { Layer, Feature, Popup, Marker } from "react-mapbox-gl";
import { getLongLat, getLongLatArr } from "../utils/mapfunctions.js";
import { Map, styles } from "../utils/mapInitialSetup.js";

export default class MapboxLayout extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      sluglines: this.props.showList,
      center: [-77.18770849999999, 38.77983520000001],
      zoom: [8],
      skip: 0,
      selectedSlugline: this.props.selectedSlugline,
      popupShowLabel: true
    };
  }

  markerClick = (selectedSlugline, { feature }) => {
    //Define the selected station, store it in the state
    this.setState({
      center: feature.geometry.coordinates,
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
    map.getCanvas().style.cursor = cursor;
    this.setState({
      selectedSlugline
    });
  };

  onMouseLeaveFunc = (cursor, { map }) => {
    map.getCanvas().style.cursor = cursor;
    this.onDrag();
  };

  render() {
    const {
      zoom,
      center,
      skip,
      selectedSlugline,
      popupShowLabel
    } = this.state;
    const arr = getLongLatArr(this.props.showList)
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        zoom={zoom}
        center={center}
        onDrag={this.onDrag}
        containerStyle={styles.container}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "bus-15" }}>
          {this.props.showList.map((slugline, i) => (
            <Marker
              key={slugline.id}
              coordinates={getLongLat(slugline)}
              onClick={this.markerClick.bind(this, slugline)}
              onMouseEnter={this.onMouseEnterFunc.bind(
                this,
                "pointer",
                slugline
              )}
              onMouseLeave={this.onMouseLeaveFunc.bind(this, "")}
            />
          ))}
        </Layer>
        {selectedSlugline && (
          <Popup
            key={selectedSlugline.id}
            coordinates={getLongLat(selectedSlugline)}
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
