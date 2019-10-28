import React from "react";
import "./index.css";

export default ({style = {}, className = "icon", viewBox = "0 0 1024 1024"}) => (
  <svg
    style={style}
    viewBox={viewBox}
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M773.632 389.12l-236.416 302.592a32 32 0 0 1-50.432-39.424l236.416-302.592a32 32 0 0 1 50.432 39.424z" />
    <path d="M300.8 349.696l236.416 302.592a32 32 0 0 1-50.432 39.424L250.368 389.12A32 32 0 0 1 300.8 349.696z" />
  </svg>
);
