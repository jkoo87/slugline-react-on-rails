import PropTypes from "prop-types";
import React from "react";
import { ListingOption, SluglineList } from "../components/SluglineList";
import MapboxLayout from "./MapboxLayout";
import axios from "axios";
import update from "immutability-helper";
import {
  filterMorningList,
  sortOutList,
  filterByLines
} from "../utils/filter.js";

export default class Sluglines extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      sluglines: this.props.sluglines,
      lineArr: sortOutList(this.props.lineList),
      selectedSluglineList: null,
      selectedLines: sortOutList(this.props.lineList),
      selectedLine: null
    };
  }

  componentDidMount() {
    // axios({
    //   method: "get",
    //   url: `/sluglines.json`
    // })
    //   .then(response => {
    //     this.setState({ sluglines: response.data });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  //when button clicked show list based on all/morning/afternoon lines
  handleIsMorningButton = e => {
    e.preventDefault();
    const isMorning = e.target.value;
    const sortedOutList = sortOutList(this.props.lineList, isMorning);
    this.setState({
      lineArr: sortedOutList,
      selectedLines: sortedOutList,
      selectedLine: null
    });
    //put all slugline related checkboxes' checked button back to 'true'
    const checkboxes = document.getElementsByName("sluglineCheckbox")
    checkboxes.forEach(checkbox => checkbox.checked = true)
  };

  handleLinesButton = e => {
    e.preventDefault();
    const line = e.target.value;
    this.setState({
      selectedSluglineList: filterByLines(this.state.sluglines, line)
    });
  };

  //select sluglines' line by checkbox option
  handleSelectedSluglinesArray = e => {
    const selectedCheckboxValue = e.target.value;
    // this.setState({ selectedLine: selectedCheckboxValue, isReloadMap: false });

    const selectedLines = this.state.selectedLines;
    if (selectedLines.length == 0) {
      const newArr = update(selectedLines, { $push: [selectedCheckboxValue] });
      this.setState({
        selectedLines: newArr
      });
    } else {
      selectedLines.filter((line, i) => {
        if (line == selectedCheckboxValue && !e.target.checked) {
          const newArr = update(selectedLines, { $splice: [[i, 1]] });
          this.setState({
            selectedLines: newArr
          });
        } else if (line !== selectedCheckboxValue && e.target.checked) {
          const newArr = update(selectedLines, {
            $push: [selectedCheckboxValue]
          });
          this.setState({
            selectedLines: newArr
          });
        }
      });
    }
  };

  render() {
    const {
      sluglines,
      lineArr,
      selectedSluglineList,
      selectedLines,
      selectedLine
    } = this.state;
    console.log("selectedlines", selectedLines);
    return (
      <div>
        <ListingOption
          handleIsMorningButton={this.handleIsMorningButton}
          handleLinesButton={this.handleLinesButton}
          handleSelectedSluglinesArray={this.handleSelectedSluglinesArray}
          lineArray={lineArr}
        />
        <MapboxLayout
          sluglines={sluglines}
          selectedSluglineList={selectedSluglineList}
          selectedLines={selectedLines}
          selectedLine={selectedLine}
          lineArr={lineArr}
        />
      </div>
    );
  }
}
