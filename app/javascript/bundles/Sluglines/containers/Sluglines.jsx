import PropTypes from "prop-types";
import React from "react";
import { AppHeader } from "../components";
import MapboxLayout from "./MapboxLayout";
import SluglineListContainer from "./SluglineListContainer";
import axios from "axios";

export default class Sluglines extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      sluglines: this.props.sluglines
    };
  }
  componentDidMount() {
    axios({
      method: "get",
      url: `/sluglines.json`
    })
      .then(response => {
        this.setState({ sluglines: response.data });
      })
      .catch(error => {
        console.log("Error");
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <MapboxLayout />
        <SluglineListContainer sluglines={this.state.sluglines} />
      </div>
    );
  }
}
