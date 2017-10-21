import PropTypes from "prop-types";
import React from "react";
import { ListingOption, SluglineList } from "../components/SluglineList";
import MapboxLayout from "./MapboxLayout";
import axios from "axios";
import update from "immutability-helper";
import {
  sortOutList,
  filterByLines,
  filterByLinesArr
} from "../utils/filter.js";

export default class Sluglines extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      sluglines: this.props.sluglines,
      lineArr: sortOutList(this.props.lineList),
      selectedLines: sortOutList(this.props.lineList),
      filteredFeatures: [],
      filteredLineFitBound: []
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
    const isMorning = e.target.value;
    const sortedOutList = sortOutList(this.props.lineList, isMorning);
    this.setState({
      lineArr: sortedOutList,
      selectedLines: sortedOutList,
      filteredFeatures: filterByLinesArr(this.state.sluglines, sortedOutList),
      filteredLineFitBound: []
    });
    //put all slugline related checkboxes' checked button back to 'true'
    const checkboxes = document.getElementsByName("sluglineCheckbox")
    checkboxes.forEach(checkbox => checkbox.checked = true)
  };

  handleLinesButton = e => {
    const line = e.target.value;

      this.setState({
        filteredLineFitBound: filterByLines(this.state.sluglines, line)
      });
  };

  //select sluglines' line by checkbox option
  handleSelectedSluglinesArray = e => {
    const selectedCheckboxValue = e.target.value;
    const sluglines = this.state.sluglines
    const selectedLines = this.state.selectedLines;
    if (selectedLines.length == 0) {
      console.log("0000000")
      const newArr = update(selectedLines, { $push: [selectedCheckboxValue] });
      this.setState({
        selectedLines: newArr,
        filteredFeatures: filterByLinesArr(sluglines, newArr),
        filteredLineFitBound: []
      });
    } else {
      selectedLines.filter((line, i) => {
        if (line == selectedCheckboxValue && !e.target.checked) {
          const newArr = update(selectedLines, { $splice: [[i, 1]] });
          if (!selectedLines.length){
            this.setState({
              selectedLines: newArr,
              filteredLineFitBound: []
            });
          } else {
            this.setState({
              selectedLines: newArr,
              filteredFeatures: filterByLinesArr(sluglines, newArr),
              filteredLineFitBound: []
            });
          }
        } else if (line !== selectedCheckboxValue && e.target.checked) {
          const newArr = update(selectedLines, {
            $push: [selectedCheckboxValue]
          });
          this.setState({
            selectedLines: newArr,
            filteredFeatures: filterByLinesArr(sluglines, newArr),
            filteredLineFitBound: []
          });
        }
      });
    }
  };

  render() {
    const {
      sluglines,
      lineArr,
      selectedLines,
      filteredFeatures,
      filteredLineFitBound
    } = this.state;
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
          selectedLines={selectedLines}
          filteredFeatures={filteredFeatures}
          filteredLineFitBound={filteredLineFitBound}
        />
      </div>
    );
  }
}
