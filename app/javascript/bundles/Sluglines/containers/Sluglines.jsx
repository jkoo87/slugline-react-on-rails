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
      lineArr: checkDuplicates(this.props.sluglines),
      selectedSlugline: null,
      selectedSluglines: this.props.sluglines
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

  componentWillUpdate(nextProps, nextState) {
    //update station lines when conditions are met
    const sluglines = this.state.selectedSluglines;
    const nextSlugines = nextState.selectedSluglines;
    if (
      sluglines[sluglines.length - 1].id !==
        nextSlugines[nextSlugines.length - 1].id ||
      sluglines.length !== nextSlugines.length
    ) {
      this.setState({
        lineArr: checkDuplicates(nextState.selectedSluglines)
      });
    }
  }

  //when button clicked 
  handleIsMorningButton = e => {
    e.preventDefault();
    const morning = e.target.value;
    const { sluglines, isMorningLine } = this.state;
    if (morning === "morning") {
      this.setState({
        selectedSluglines: filterMorningList(sluglines, true)
      });
    } else if (morning === "afternoon") {
      this.setState({
        selectedSluglines: filterMorningList(sluglines, false)
      });
    } else if (morning === "all") {
      this.setState({
        selectedSluglines: sluglines,
        isMorningLine: !isMorningLine
      });
    }
  };

  handleLinesButton = e => {
    e.preventDefault();
    const line = e.target.value;
    this.setState({
      selectedSluglines: filterByLines(this.state.sluglines, line)
    });
  };

  render() {
    const {
      sluglines,
      lineArr,
      selectedSlugline,
      selectedSluglines
    } = this.state;
    console.log(sluglines);
    return (
      <div>
        <MapboxLayout
          showList={selectedSluglines}
          selectedSlugline={selectedSlugline}
        />
        <div>
          <ListingOption
            handleIsMorningButton={this.handleIsMorningButton}
            handleLinesButton={this.handleLinesButton}
            lineArray={lineArr}
          />
          <SluglineList showList={selectedSluglines} />
        </div>
      </div>
    );
  }
}
