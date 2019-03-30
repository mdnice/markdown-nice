import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "mobx-react";
import content from "./store/content";
import title from "./store/title";
import userInfo from "./store/userInfo";
import navbar from "./store/navbar";
import dialog from "./store/dialog";

ReactDOM.render(
  <Provider
    content={content}
    title={title}
    userInfo={userInfo}
    navbar={navbar}
    dialog={dialog}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
