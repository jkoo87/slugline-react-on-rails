import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sluglines from "./containers/Sluglines";
import { AppHeader, Slugline } from "./components";
import update from "immutability-helper";
import { getLineColor } from "./utils/mapfunctions.js";

//add color to each slugline property before passed down to components
const addColorToLines = arr => {
  const newArr = []
  arr.forEach((obj) => {
    const newSluglines = update(obj, {$merge: {color: getLineColor(obj.line)}})
    newArr.push(newSluglines)
  })
  return newArr
};

export default props => {
  return (
    <Router>
      <div>
        <Route path="/" component={AppHeader} />
          <Route
            exact
            path="/"
            render={routerProps => (
              <Sluglines {...routerProps} sluglines={addColorToLines(props.sluglines)} />
            )}
          />
        <Route
          exact
          path="/sluglines/:id"
          render={routerProps => (
            <Slugline {...routerProps} slugline={props.slugline} />
          )}
        />
      </div>
    </Router>
  );
};
