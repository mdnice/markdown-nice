import React from "react";
import "./index.css";

export default ({fill = "red", style = {}, className = "icon", viewBox = "0 0 1024 1024"}) => (
  <svg
    style={style}
    viewBox={viewBox}
    className={className}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M192 512 0 512 256 768 512 512 320 512C320 300.16 492.16 128 704 128 768.64 128 830.08 144 883.2 172.8L976.64 79.36C897.92 29.44 804.48 0 704 0 421.12 0 192 229.12 192 512L192 512ZM1088 512C1088 723.84 915.84 896 704 896 639.36 896 577.92 880 524.8 851.2L431.36 944.64C510.08 994.56 603.52 1024 704 1024 986.88 1024 1216 794.88 1216 512L1408 512 1152 256 896 512 1088 512 1088 512Z" />
  </svg>
);
