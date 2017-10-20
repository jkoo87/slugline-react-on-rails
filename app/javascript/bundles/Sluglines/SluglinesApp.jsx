import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sluglines from "./containers/Sluglines";
import { AppHeader, Slugline } from "./components";
import update from "immutability-helper";

export default props => {
  return (
    <Router>
      <div>
        <Route path="/" component={AppHeader} />
        <Route
          exact
          path="/"
          render={routerProps => (
            <Sluglines
              {...routerProps}
              sluglines={props.sluglines}
              lineList={props.lineList}
            />
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
