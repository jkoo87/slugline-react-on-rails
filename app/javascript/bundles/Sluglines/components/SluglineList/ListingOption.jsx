import React from "react";

export const ListingOption = props => (
  <div>
    <button value="morning" onClick={props.handleIsMorningButton}>
      Morning Stations
    </button>
    <button value="afternoon" onClick={props.handleIsMorningButton}>
      Afternoon Stations
    </button>
    <div>
      {props.lineArray.map((line, i) => {
        return (
          <button key={i} value={line} onClick={props.handleLinesButton}>
            {line}
          </button>
        );
      })}
    </div>
  </div>
);
