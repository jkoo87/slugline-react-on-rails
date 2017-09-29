import PropTypes from "prop-types";
import React from "react";
import { Slugline, AppHeader } from "../components";

export default class Sluglines extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      sluglines: this.props.sluglines
    };
  }

  render() {
    return (
      <div>
        <h3>Hello {this.state.sluglines[3].name}!</h3>
        <Slugline sluglines={this.state.sluglines}/>
      </div>
    );
  }
}
