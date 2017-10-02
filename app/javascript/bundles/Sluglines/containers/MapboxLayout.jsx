import PropTypes from "prop-types";
import React from "react";
import {  } from "../components";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

export default class MapboxLayout extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1Ijoiamtvbzg3IiwiYSI6ImNqODR4MjV5ODBmMjgycW82dzZ1MG56MnAifQ.W-XPeSwFh6fJ5B9Dujfw9A"
    });
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "50vh",
          width: "50vh"
        }}>
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
          </Layer>
      </Map>
    );
  }
}
