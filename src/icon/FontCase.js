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
      d="M479.829333 640H202.837333l-85.333333 213.333333H25.6L298.666667 170.666667h85.333333l273.066667 682.666666h-91.904l-85.333334-213.333333z m-34.133333-85.333333L341.333333 293.76 236.970667 554.666667h208.725333zM896 534.826667V512h85.333333v341.333333h-85.333333v-22.826666a170.666667 170.666667 0 1 1 0-295.68zM810.666667 768a85.333333 85.333333 0 1 0 0-170.666667 85.333333 85.333333 0 0 0 0 170.666667z"
      p-id="2586"
    />
  </svg>
);
