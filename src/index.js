import React from "react";
import ReactDOM from "react-dom";

import Lib from "./Lib";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Lib
    useImageHosting={{
      url: "https://imgkr.com/api/files/upload",
      name: "图壳",
      isSmmsOpen: true,
      isQiniuyunOpen: true,
      isAliyunOpen: true,
    }}
    defaultTitle="Markdown Nice"
  />,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
