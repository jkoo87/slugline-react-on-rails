import PropTypes from "prop-types";
import React from "react";
import { ListingOption, SluglineList } from "../components/SluglineList";
import MapboxLayout from "./MapboxLayout";
import axios from "axios";
import {
  filterMorningList,
  checkDuplicates,
  filterByLines
} from "../utils/filter.js";

export default class Sluglines extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      sluglines: this.props.sluglines,
      isMorningLine: true,
      line: "",
      selectedSlugline: null
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
        console.log(error);
      });
  }
  handleIsMorningButton = e => {
    e.preventDefault();
    if (e.target.value === "morning") {
      this.setState({ isMorningLine: true, line: "" });
    } else {
      this.setState({ isMorningLine: false, line: "" });
    }
  };

  handleLinesButton = e => {
    e.preventDefault();
    const line = e.target.value;
    this.setState({ line: line });
  };

  render() {
    const { sluglines, isMorningLine, line, selectedSlugline } = this.state;
    //filter sluglines by am/pm stations
    const sortOutList = filterMorningList(sluglines, isMorningLine);
    //get list of lines after filtered by am/pm stations
    const lineArray = checkDuplicates(sortOutList);
    //show all morning/afternoon lines if specific line button not clicked
    const showList = line !== "" ? filterByLines(sortOutList, line) : sortOutList;

    return (
      <div>
        <MapboxLayout showList={showList} selectedSlugline={selectedSlugline} />
        <div>
          <ListingOption
            handleIsMorningButton={this.handleIsMorningButton}
            handleLinesButton={this.handleLinesButton}
            lineArray={lineArray}
            isMorningLine={isMorningLine}
          />
          <SluglineList showList={showList} />
        </div>
      </div>
    );
  }
}
