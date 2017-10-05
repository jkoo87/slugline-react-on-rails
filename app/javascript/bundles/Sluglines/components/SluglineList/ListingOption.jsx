import React from "react";
import { getLineColor } from "../../utils/mapfunctions.js";

export const ListingOption = props => (
  <div>
    <button value="all" onClick={props.handleIsMorningButton}>
      All Stations
    </button>
    <button value="morning" onClick={props.handleIsMorningButton}>
      Morning Stations
    </button>
    <button value="afternoon" onClick={props.handleIsMorningButton}>
      Afternoon Stations
    </button>
    <div>
      {props.lineArray.map((line, i) => {
        return (
          <button style={{backgroundColor: getLineColor(line)}} key={i} value={line} onClick={props.handleLinesButton}>
            {line}
          </button>
        );
      })}
    </div>
  </div>
);
