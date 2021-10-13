import React, {Component} from "react";
import PropTypes from "prop-types";
import {Result} from "antd";
import {Provider} from "mobx-react";

import "./index.css";

import App from "./App";

import content from "./store/content";
import userInfo from "./store/userInfo";
import navbar from "./store/navbar";
import footer from "./store/footer";
import dialog from "./store/dialog";
import imageHosting from "./store/imageHosting";
import view from "./store/view";

import {isPC} from "./utils/helper";
import appContext from "./utils/appContext";
import SvgIcon from "./icon";
import {solveWeChatMath, solveZhihuMath, solveHtml} from "./utils/converter";
import {LAYOUT_ID} from "./utils/constant";

class Lib extends Component {
  getWeChatHtml() {
    const layout = document.getElementById(LAYOUT_ID); // 保护现场
    const html = layout.innerHTML;
    solveWeChatMath();
    const res = solveHtml();
    layout.innerHTML = html; // 恢复现场
    return res;
  }

  getZhihuHtml() {
    const layout = document.getElementById(LAYOUT_ID); // 保护现场
    const html = layout.innerHTML;
    solveZhihuMath();
    const res = solveHtml();
    layout.innerHTML = html; // 恢复现场
    return res;
  }

  render() {
    const {
      defaultTitle,
      defaultText,
      onTextChange,
      onTextBlur,
      onTextFocus,
      onStyleChange,
      onStyleBlur,
      onStyleFocus,
      token,
      useImageHosting,
    } = this.props;
    const appCtx = {
      defaultTitle,
      defaultText,
      onTextChange,
      onTextBlur,
      onTextFocus,
      onStyleChange,
      onStyleBlur,
      onStyleFocus,
      token,
      useImageHosting,
    };
    return (
      <Provider
        content={content}
        userInfo={userInfo}
        navbar={navbar}
        footer={footer}
        dialog={dialog}
        imageHosting={imageHosting}
        view={view}
      >
        <appContext.Provider value={appCtx}>
          <App
            defaultText={defaultText}
            onTextChange={onTextChange}
            onTextBlur={onTextBlur}
            onTextFocus={onTextFocus}
            onStyleChange={onStyleChange}
            onStyleBlur={onStyleBlur}
            onStyleFocus={onStyleFocus}
            useImageHosting={useImageHosting}
            token={token}
          />
        </appContext.Provider>
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
  defaultTitle: "",
  defaultText: "",
  onTextChange: () => {},
  onTextBlur: () => {},
  onTextFocus: () => {},
  onStyleChange: () => {},
  onStyleBlur: () => {},
  onStyleFocus: () => {},
  token: "",
  // eslint-disable-next-line react/default-props-match-prop-types
  useImageHosting: {
    url: "",
    name: "",
    isSmmsOpen: true,
    isQiniuyunOpen: true,
    isAliyunOpen: true,
    isGiteeOpen: true,
    isGitHubOpen: true,
  },
};
Lib.propTypes = {
  defaultTitle: PropTypes.string,
  defaultText: PropTypes.string,
  onTextChange: PropTypes.func,
  onTextBlur: PropTypes.func,
  onTextFocus: PropTypes.func,
  onStyleChange: PropTypes.func,
  onStyleBlur: PropTypes.func,
  onStyleFocus: PropTypes.func,
  token: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  useImageHosting: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
    isSmmsOpen: PropTypes.bool,
    isQiniuyunOpen: PropTypes.bool,
    isAliyunOpen: PropTypes.bool,
    isGiteeOpen: PropTypes.bool,
    isGitHubOpen: PropTypes.bool,
  }),
};

export default Lib;
