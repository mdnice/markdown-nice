import React from "react";
import "./index.css";

export default ({fill = "rgba(0,0,0,0.65)", style = {}, className = "icon", viewBox = "0 0 1024 1024"}) => (
  <svg
    style={style}
    viewBox={viewBox}
    className={className}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M736 0l-448 0c-52.8 0-96 43.2-96 96l0 832c0 52.8 43.2 96 96 96l448 0c52.8 0 96-43.2 96-96l0-832c0-52.8-43.2-96-96-96zM384 48l256 0 0 32-256 0 0-32zM512 960c-35.346 0-64-28.654-64-64s28.654-64 64-64 64 28.654 64 64-28.654 64-64 64zM768 768l-512 0 0-640 512 0 0 640z" />
  </svg>
);
