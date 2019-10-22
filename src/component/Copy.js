import React, {Component} from "react";
import juice from "juice";
import {observer, inject} from "mobx-react";
import {Button, message, ConfigProvider} from "antd";
import cssAST from "css-tree";
import {BASIC_THEME_ID, CODE_THEME_ID, MARKDOWN_THEME_ID} from "../utils/constant";

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

  deepFind = (list, target) => {
    // TODO: 补全递归
  };

  solveCssCounter = (html) => {
    const markdownStyle = document.getElementById(MARKDOWN_THEME_ID).innerText;
    const cssNodeList = cssAST.parse(markdownStyle).children;
    // 递归链表 找出 preset 的 value
    // 特征： children.head.data.block.children.head.data.property = "conter-reset"
    //       children.head.data.block.children.tail.data.value = "0"
    const resetValue = this.deepFind(cssNodeList, "counter-reset");

    // 特征 children.head.next.data.block.children.head.data.property = "counter-increcement"
    //      children.head.next.data.block.children.head.data.value.value = "第 counter(c) 个"
    const incrcement = this.deepFind(cssNodeList, "counter-increment");

    // parseHTML 找到 所有 h1 标签，然后遍历，增加对应的 index 值
    // console.log(increment);
    const ci = /\s?counter-increment:\s\S+?;/g;
    html = html.replace(ci, "");
    const counter = /"counter(\S+?)"/g;
    const dict = {};
    html = html.replace(counter, (matched, key) => {
      let value = dict[key];
      value = value ? value + 1 : 1;
      dict[key] = value;
      return value;
    });
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
