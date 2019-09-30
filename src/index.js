import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import {Provider} from "mobx-react";
import content from "./store/content";
import title from "./store/title";
import userInfo from "./store/userInfo";
import navbar from "./store/navbar";
import dialog from "./store/dialog";
import imageHosting from "./store/imageHosting";

import {isPC} from "./utils/helper";
import {Result, Icon} from "antd";

ReactDOM.render(
  <Provider
    content={content}
    title={title}
    userInfo={userInfo}
    navbar={navbar}
    dialog={dialog}
    imageHosting={imageHosting}
  >
    {isPC() ? (
      <App />
    ) : (
      <Result
        icon={<Icon type="smile" theme="twoTone" />}
        title="请使用 PC 端打开排版工具"
        subTitle="更多 Markdown Nice 信息，请扫码关注公众号「牧码啦」"
        extra={
          <img
            alt=""
            src="https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/%E4%BA%8C%E7%BB%B4%E7%A0%81_20190823124950.gif"
          />
        }
      />
    )}
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
