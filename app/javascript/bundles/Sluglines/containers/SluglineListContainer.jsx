import PropTypes from "prop-types";
import React from "react";
import { ListingOption, SluglineList } from "../components/SluglineList";
import {
  filterMorningList,
  checkDuplicates,
  filterByLines
} from "../utils/filter.js";

export default class SluglineListContainer extends React.Component {
  static propTypes = {};
  static defaultProps = {
    sluglines: []
  };

  constructor(props) {
    super(props);
    this.state = {
      sluglines: this.props.sluglines,
      isMorningLine: true,
      line: ""
    };
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
    const { sluglines, isMorningLine, line } = this.state;
    //filter sluglines by am/pm stations
    const sortOutList = filterMorningList(sluglines, isMorningLine);
    //get list of lines after filtered by am/pm stations
    const lineArray = checkDuplicates(sortOutList);
    //filter sluglines by line using filtered array and line button clicked
    const sortOutByLine = filterByLines(sortOutList, line);
    //show all morning/afternoon lines if specific line button not clicked
    const showList = line !== "" ? sortOutByLine : sortOutList;

    return (
      <div>
        <ListingOption
          handleIsMorningButton={this.handleIsMorningButton}
          handleLinesButton={this.handleLinesButton}
          lineArray={lineArray}
          isMorningLine={isMorningLine}
        />
        <SluglineList sortOutList={showList} />
      </div>
    );
  }
}
