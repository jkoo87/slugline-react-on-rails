import React from "react";
import { Link } from "react-router-dom";

export const SluglineList = props => (
    <div>
      {props.sortOutList.map(slugline => {
        return (
          <div key={slugline.id}>
            <Link to={`/sluglines/${slugline.id}`} slugline={slugline}>
              <h1>{slugline.name}</h1>
            </Link>
            <h2>{slugline.line}</h2>
          </div>
        );
      })}
    </div>
);
