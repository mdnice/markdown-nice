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
    <path
      d="M527.52 1024C229.216 1024 0 794.784 0 527.52 0 229.216 229.216 0 527.52 0 794.784 0 1024 229.216 1024 527.52 1024 794.784 794.784 1024 527.52 1024zM512 960c247.424 0 448-200.576 448-448S759.424 64 512 64 64 264.576 64 512s200.576 448 448 448z m-96-576h160v384h64v32h-224v-32h64V416h-64v-32z m96-64a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"
      p-id="2041"
    />
  </svg>
);
