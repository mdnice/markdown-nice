import React, { Component } from "react";
import juice from "juice";
import { observer, inject } from "mobx-react";
import { Button, message, ConfigProvider } from "antd";

import { markdownParser } from "../utils/helper";
import {
  BASIC_THEME_ID,
  CODE_THEME_ID,
  MARKDOWN_THEME_ID,
} from "../utils/constant";

@inject("content")
@observer
class Copy extends Component {
  success = () => {
    message.success("已复制，请到微信公众平台粘贴");
  };

  copyHtml = () => {
    const basicStyle = document.getElementById(BASIC_THEME_ID).innerText;
    const markdownStyle = document.getElementById(MARKDOWN_THEME_ID).innerText;
    const codeStyle = document.getElementById(CODE_THEME_ID).innerText;
    const htmlStr = `<section class="layout">${markdownParser.render(
      this.props.content.content
    )}</section>`;
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
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Button type="primary" style={style.btnHeight} onClick={this.copyHtml}>
          复制
        </Button>
      </ConfigProvider>
    );
  }
}

const style = {
  btnHeight: {
    height: "30px"
  }
};

export default Copy;
