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
    <path d="M904 120H120c-30.9 0-56 25.1-56 56v560c0 30.9 25.1 56 56 56h280v56h-84c-15.5 0-28 12.5-28 28s12.5 28 28 28h392c15.5 0 28-12.5 28-28s-12.5-28-28-28h-84v-56h280c30.9 0 56-25.1 56-56V176c0-30.9-25.1-56-56-56zM568 848H456v-56h112v56z m336-112H120v-56h784v56zM120 624V176h784v448H120z" />
  </svg>
);
