import React from "react";
import { Link } from "react-router-dom";
import { truncate } from "../../utils/truncate.js";

export const SluglineList = props => (
    <div>
      {props.showList.map(slugline => {
        return (
          <div key={slugline.id}>
            <Link to={`/sluglines/${slugline.id}`} slugline={slugline}>
              <h2>{slugline.name}</h2>
            </Link>
            <p>{truncate(slugline.location, 100)}</p>
          </div>
        );
      })}
    </div>
);
