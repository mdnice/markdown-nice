import React, { Component } from "react";
import juice from "juice";
import { observer, inject } from "mobx-react";
import { Tooltip, Button, Icon, message } from "antd";
import "antd/dist/antd.css";

import "./CopyBtn.css"
import copyIcon from "../icon/copy.svg";
import { markdownParser } from "../utils/helper"
import {
  BASIC_THEME_ID,
  CODE_THEME_ID,
  MARKDOWN_THEME_ID,
  ENTER_DELAY,
  LEAVE_DELAY
} from "../utils/constant";

@inject("content")
@observer
class CopyBtn extends Component {

  success = () => {
    message.success("已复制，请到微信公众平台粘贴");
  };

  copyHtml = () => {
    const basicStyle = document.getElementById(BASIC_THEME_ID).innerText;
    const markdownStyle = document.getElementById(MARKDOWN_THEME_ID).innerText;
    const codeStyle = document.getElementById(CODE_THEME_ID).innerText;
    const htmlStr = `<section class="layout">${
      markdownParser.render(this.props.content.content)
    }</section>`;
    const result = juice.inlineContent(
      htmlStr,
      basicStyle + markdownStyle + codeStyle,
      {
        inlinePseudoElements: true
      }
    );
    console.log(result);
    this.copyToClip(result);
    this.success();
  };

  copyToClip = str => {
    function listener(e) {
      e.clipboardData.setData("text/html", str);
      e.clipboardData.setData("text/plain", str);
      e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
  };

  render() {
    return (
      <Tooltip
        placement="bottom"
        mouseEnterDelay={ENTER_DELAY}
        mouseLeaveDelay={LEAVE_DELAY}
        title="点击复制"
      >
        <Button
          style={{ padding: "0 8px", color: "orange" }}
          className="getBtn"
          onClick={this.copyHtml}
        >
          <Icon component={copyIcon} style={{ fontSize: "18px" }} />
        </Button>
      </Tooltip>
    );
  }
}

export default CopyBtn;
