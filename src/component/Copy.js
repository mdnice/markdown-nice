import React, { Component } from "react";
import juice from "juice";
import { observer, inject } from "mobx-react";
import { Button, message, ConfigProvider } from "antd";
import html2canvas from "html2canvas";

import {
  axiosJSON,
  b64toBlob
} from "../utils/helper";
import {
  BASIC_THEME_ID,
  CODE_THEME_ID,
  MARKDOWN_THEME_ID,
  SM_MS_PROXY
} from "../utils/constant";

@inject("content")
@inject("navbar")
@observer
class Copy extends Component {
  success = () => {
    message.success("已复制，请到微信公众平台粘贴");
  };

  loadFinish = sum => {};

  uploadMathImage = async base64 => {
    const block = base64.split(";");
    const contentType = block[0].split(":")[1];
    const realData = block[1].split(",")[1];
    var blob = b64toBlob(realData, contentType);

    const formData = new FormData();
    formData.append("smfile", blob);
    const res = await axiosJSON.post(SM_MS_PROXY, formData);
    return res.data.data.url;
  };

  solveMath = async () => {
    const mathNums = document.getElementsByClassName("katex").length;
    // 图片已经转换完了
    if(mathNums === 0) {
      this.copyHtml();
      return;
    }
    const hide = message.loading('正在将公式转成图片', 0);
    // Dismiss manually and asynchronously
    let count = 0;
    // 先处理块公式，再处理行内公式
    const tagsBlock = document.getElementsByClassName("katex-display");
    for (let i = 0; i < tagsBlock.length; i++) {
      const canvas = await html2canvas(tagsBlock[i], { logging: false });
      const url = await this.uploadMathImage(canvas.toDataURL())
      const img = new Image();
      img.src = url;
      img.onload = () => {
        count++;
        if (count === mathNums) {
          hide();
          this.copyHtml();
        }
      };
      img.className = "math-img-block";
      while (tagsBlock[i].firstChild) {
        tagsBlock[i].removeChild(tagsBlock[i].firstChild);
      }
      tagsBlock[i].appendChild(img);
    }

    const tagsInline = document.getElementsByClassName("katex");
    for (let i = 0; i < tagsInline.length; i++) {
      if (tagsInline[i]) {
        const canvas = await html2canvas(tagsInline[i], { logging: false });
        const url = await this.uploadMathImage(canvas.toDataURL())
        const img = new Image();
        img.src = url;
        img.onload = () => {
          count++;
          if (count === mathNums) {
            hide();
            this.copyHtml();
          }
        };
        img.className = "math-img-inline";
        while (tagsInline[i].firstChild) {
          tagsInline[i].removeChild(tagsInline[i].firstChild);
        }
        tagsInline[i].appendChild(img);
        tagsInline[i].setAttribute("class", "katex-inline");
      }
    }
  };

  copyHtml = () => {
    const element = document.getElementById("wx-box");
    const basicStyle = document.getElementById(BASIC_THEME_ID).innerText;
    const markdownStyle = document.getElementById(MARKDOWN_THEME_ID).innerText;
    const codeStyle = document.getElementById(CODE_THEME_ID).innerText;
    // const parseHtml = this.props.navbar.isWechatCode
    //   ? markdownParserWechat.render(this.props.content.content)
    //   : markdownParser.render(this.props.content.content);
    // const htmlStr = `<section class="layout">${parseHtml}</section>`;
    const result = juice.inlineContent(
      element.innerHTML,
      basicStyle + markdownStyle + codeStyle,
      {
        inlinePseudoElements: true
      }
    );
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
        <Button type="primary" style={style.btnHeight} onClick={this.solveMath}>
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
