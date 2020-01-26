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
      d="M552.220444 512l201.159112 201.159111a28.444444 28.444444 0 0 1-40.220445 40.220445L512 552.220444l-201.159111 201.159112a28.444444 28.444444 0 0 1-40.220445-40.220445L471.779556 512 270.620444 310.840889a28.444444 28.444444 0 1 1 40.220445-40.220445L512 471.779556l201.159111-201.159112a28.444444 28.444444 0 0 1 40.220445 40.220445L552.220444 512z"
      fill="#5A6677"
      p-id="2215"
    />
  </svg>
);
