import React, {Component} from "react";
import "./index.css";

import App from "./App";

import {Provider} from "mobx-react";
import content from "./store/content";
import title from "./store/title";
import userInfo from "./store/userInfo";
import navbar from "./store/navbar";
import dialog from "./store/dialog";
import imageHosting from "./store/imageHosting";

import {isPC} from "./utils/helper";
import {Result} from "antd";
import SvgIcon from "./icon";

// 在 head 中注入标签
function createStyles() {
  // <link href="https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/KaTeX/0.5.1/katex.min.css" rel="stylesheet" />
  const katex = document.createElement("link");
  katex.href = "https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/KaTeX/0.5.1/katex.min.css";
  katex.rel = "stylesheet";
  const head = document.querySelector("head");
  const styles = document.createDocumentFragment();
  styles.appendChild(katex);
  head.appendChild(styles);
}

class Lib extends Component {
  componentDidMount() {
    createStyles();
  }

  render() {
    return (
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
            icon={<SvgIcon name="smile" style={style.svgIcon} />}
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
      </Provider>
    );
  }
}

const style = {
  svgIcon: {
    width: "72px",
    height: "72px",
  },
};

export default Lib;
