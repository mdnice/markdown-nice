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

let hasMathJax = false;

function injectMathJax() {
  if (!hasMathJax) {
    const mathJaxCfgScript = document.createElement("script");
    mathJaxCfgScript.innerHTML = `
MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']]
  },
  svg: {
    fontCache: 'none'
  },
  startup: {
    ready: () => {
      MathJax.startup.defaultReady();
      MathJax.startup.promise.then(() => {
        var element = document.getElementById('wx-box');
        const formulas = element.getElementsByTagName('mjx-container');
        while (formulas.length > 0) {
          var mjx = formulas[0];
          if (mjx.hasAttribute('display')) {
            var parent = mjx.parentNode;
            var svgContainer = document.createElement('section');
            svgContainer.innerHTML = mjx.innerHTML;
            svgContainer.className = 'block-equation';
            parent.replaceChild(svgContainer, mjx);
          } else {
            mjx.outerHTML = mjx.innerHTML;
          }
        }
      });
    }
  }
};
    `;
    const mathJaxDep = document.createElement("script");
    mathJaxDep.type = "text/javascript";
    mathJaxDep.id = "MathJax-script";
    mathJaxDep.src = "https://my-wechat.mdnice.com/mdnice/mathjax@3.0.0_es5_tex-svg.js";
    document.head.appendChild(mathJaxCfgScript);
    document.head.appendChild(mathJaxDep);
    hasMathJax = true;
  }
}

class Lib extends Component {
  componentDidMount() {
    injectMathJax();
  }

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
