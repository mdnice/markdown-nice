import React, {Component} from "react";
import PropTypes from "prop-types";
import "./index.css";

import App from "./App";

import {Provider} from "mobx-react";
import content from "./store/content";
import userInfo from "./store/userInfo";
import navbar from "./store/navbar";
import dialog from "./store/dialog";
import imageHosting from "./store/imageHosting";

import {isPC} from "./utils/helper";
import appContext from "./utils/appContext";
import {Result} from "antd";
import SvgIcon from "./icon";

try {
  window.MathJax = {
    tex: {
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]],
    },
    svg: {
      fontCache: "none",
    },
    options: {
      renderActions: {
        addMenu: [0, "", ""],
      },
    },
    startup: {
      ready: () => {
        window.MathJax.startup.defaultReady();
        window.MathJax.startup.promise.then(() => {
          const element = document.getElementById("layout");
          let html = element.innerHTML;
          html = html.replace(
            /<mjx-container.+?display.+?>(.+?)<\/mjx-container>/g,
            '<section class="block-equation">$1</section>',
          );
          html = html.replace(/<mjx-container.+?>(.+?)<\/mjx-container>/g, '<span class="inline-equation">$1</span>');
          element.innerHTML = html;
        });
      },
    },
  };

  // eslint-disable-next-line global-require
  require("mathjax/es5/tex-svg");
} catch (e) {
  // console.log(e);
}

class Lib extends Component {
  render() {
    const {previewType, defaultTitle, onTitleChange, defaultText, onTextChange} = this.props;
    const appCtx = {
      previewType,
      defaultTitle,
      onTitleChange,
    };

    return (
      <Provider content={content} userInfo={userInfo} navbar={navbar} dialog={dialog} imageHosting={imageHosting}>
        {isPC() ? (
          <appContext.Provider value={appCtx}>
            <App defaultText={defaultText} onTextChange={onTextChange} />
          </appContext.Provider>
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

Lib.defaultProps = {
  defaultTitle: "Markdown Nice",
  previewType: "mobile",
  onTitleChange: () => {},
  defaultText: "",
  onTextChange: () => {},
};
Lib.propTypes = {
  defaultTitle: PropTypes.string,
  previewType: PropTypes.oneOf(["mobile", "pc"]),
  onTitleChange: PropTypes.func,
  defaultText: PropTypes.string,
  onTextChange: PropTypes.func,
};

export default Lib;
