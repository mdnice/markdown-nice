import React, {Component} from "react";
import juice from "juice";
import {observer, inject} from "mobx-react";
import {Button, message, ConfigProvider} from "antd";
import {BASIC_THEME_ID, CODE_THEME_ID, MARKDOWN_THEME_ID} from "../utils/constant";
import cssom from "cssom";

@inject("content")
@inject("navbar")
@inject("imageHosting")
@inject("dialog")
@observer
class Copy extends Component {
  constructor(props) {
    super(props);
    this.mathNums = 0;
    this.html = "";
    this.scale = 2;
    this.state = {
      loading: false,
    };
  }

  solveMath = () => {
    const svgArr = document.getElementsByTagName("svg");
    for (let i = 0; i < svgArr.length; i++) {
      const svg = svgArr[i];
      if (!svg.hasAttribute("style")) {
        continue;
      }
      const width = svg.getAttribute("width");
      if (width === null) {
        break;
      }
      const height = svg.getAttribute("height");
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.style.width = width;
      svg.style.height = height;
    }
  };

  solveCssCounter = (html) => {
    const markdownStyle = window.localStorage.getItem("style");
    // expected result like [".layout {↵counter-reset: slz 123123;↵}"]
    const matchResult = markdownStyle.match(/.+\s+\{{1}\s?counter-reset:.+;\s}/g);
    let counterName, counterInitValue;
    if (Array.isArray(matchResult) && matchResult.length !== 0) {
      const ast = cssom.parse(matchResult[0]);
      if (ast.cssRules.length !== 0) {
        const propertyToken = ast.cssRules[0].style[0];
        [counterName, counterInitValue] = ast.cssRules[0].style[propertyToken].split(/\s+/);
        console.log(propertyToken);
        console.log(counterName, counterInitValue);
      }
    }
    if (counterName) {
      // TODO: parse HTML and find all of h1 tags, and parse css increment
      // TODO: parse increment value, and analyze ::before or ::after for append position
    }
    return html;
  };

  solveHtml = () => {
    const element = document.getElementById("wx-box");
    let html = element.innerHTML;
    html = html.replace(/\s<span class="inline>/g, '&nbsp;<span class="inline>');
    html = html.replace(/svg><\/span>\s/g, "svg></span>&nbsp;");
    const basicStyle = document.getElementById(BASIC_THEME_ID).innerText;
    const markdownStyle = document.getElementById(MARKDOWN_THEME_ID).innerText;
    const codeStyle = document.getElementById(CODE_THEME_ID).innerText;
    try {
      this.html = juice.inlineContent(html, basicStyle + markdownStyle + codeStyle, {
        inlinePseudoElements: true,
        preserveImportant: true,
      });
      this.html = this.solveCssCounter(this.html);
    } catch (e) {
      message.error("请检查 CSS 文件是否编写正确！");
    }
  };

  copy = () => {
    this.setState({loading: true});
    this.solveMath();
    this.solveHtml();
    document.addEventListener("copy", this.copyListener);
    document.execCommand("copy");
    document.removeEventListener("copy", this.copyListener);
    this.setState({loading: false});
  };

  copyListener = (e) => {
    // 由于antd的message原因，有这行输出则每次都会进来，否则有问题，具体原因不明
    // console.log("clipboard");
    message.success("已复制，请到微信公众平台粘贴");
    e.clipboardData.setData("text/html", this.html);
    e.clipboardData.setData("text/plain", this.html);
    e.preventDefault();
  };

  render() {
    return (
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Button type="primary" style={style.btnHeight} onClick={this.copy} loading={this.state.loading}>
          复制
        </Button>
      </ConfigProvider>
    );
  }
}

const style = {
  btnHeight: {
    height: "30px",
  },
  mathNotify: {
    padding: 0,
    fontSize: "14px",
    lineHeight: "20px",
    color: "rgba(0,0,0,0.65)",
  },
  close: {
    padding: 0,
  },
};

export default Copy;
