import React, { Component } from "react";
import juice from "juice";
import { observer, inject } from "mobx-react";
import { Button, message, ConfigProvider } from "antd";
import axios from "axios";

import {
  BASIC_THEME_ID,
  CODE_THEME_ID,
  MARKDOWN_THEME_ID
} from "../utils/constant";

@inject("content")
@inject("navbar")
@inject("imageHosting")
@observer
class Copy extends Component {
  constructor(props) {
    super(props);
    this.mathNums = 0;
    this.html = "";
    this.scale = 2;
    this.state = {
      loading: false
    };
  }

  // 形成结果 <div class="katex-display"><img class="math-img-block"/></div>
  solveBlockMath = async () => {
    const mathReg = /\$\$([^]*?)\$\$/g;
    const content = this.props.content.content;

    const mathBlock = content.match(mathReg);
    const tagsBlock = document.getElementsByClassName("katex-display");

    if (mathBlock != null) {
      if (mathBlock.length !== tagsBlock.length) {
        return false;
      }

      const urlArr = [];
      for (let i = 0; i < mathBlock.length; i++) {
        // 转换过的公式避免再次转换
        if (tagsBlock[i].firstChild.className === "math-img-block") continue;
        const math = mathBlock[i];
        let formula = math.split("$$")[1];
        formula = encodeURI(formula.replace(/\s/g, "&space;"));
        const ip = window.returnCitySN.cip.replace(/\./g, '-');
        const url = `https://math.mdnice.com/${ip}/type/png/scale/${this.scale}/math/${formula}`;
        urlArr.push(url);
      }

      // 使用promise并行发请求，增快公式转换速度
      const promiseArr = urlArr.map(url => axios.get(url));

      const resultArr = await Promise.all(promiseArr);
      resultArr.forEach((result, index) => {
        const img = new Image();
        img.src = result.data;
        img.onload = this.imgOnload;
        img.className = "math-img-block";
        tagsBlock[index].removeChild(tagsBlock[index].firstChild);
        tagsBlock[index].appendChild(img);
      });
    }
    return true;
  };

  // 形成结果 <span class="katex"><img class="math-img-inline"/></span>
  solveInlineMath = async () => {
    const mathReg = /\$([^]*?)\$/g;
    const content = this.props.content.content;

    let mathInline = content.match(mathReg);

    if (mathInline != null) {
      mathInline = mathInline.filter(item => item !== "$$"); // 过滤掉匹配的$$没用符号
      const tagsInline = document.getElementsByClassName("katex");

      if (mathInline.length !== tagsInline.length) {
        return false;
      }

      const urlArr = [];
      for (let i = 0; i < mathInline.length; i++) {
        // 转换过的公式避免再次转换
        if (tagsInline[i].firstChild.className === "math-img-inline") continue;
        const math = mathInline[i];
        let formula = math.split("$")[1];
        formula = encodeURI(formula.replace(/\s/g, "&space;"));
        const ip = window.returnCitySN.cip.replace(/\./g, '-');
        const url = `https://math.mdnice.com/${ip}/type/png/scale/${this.scale}/math/${formula}`;
        urlArr.push(url);
      }
      // 使用promise并行发请求，增快公式转换速度
      const promiseArr = urlArr.map(url => axios.get(url));

      const resultArr = await Promise.all(promiseArr);
      resultArr.forEach((result, index) => {
        const img = new Image();
        img.src = result.data;
        img.onload = this.imgOnload;
        img.className = "math-img-inline";
        tagsInline[index].removeChild(tagsInline[index].firstChild);
        tagsInline[index].removeChild(tagsInline[index].firstChild);
        tagsInline[index].appendChild(img);
      });
    }
    return true;
  };

  solveHtml = () => {
    const element = document.getElementById("wx-box");
    const basicStyle = document.getElementById(BASIC_THEME_ID).innerText;
    const markdownStyle = document.getElementById(MARKDOWN_THEME_ID).innerText;
    const codeStyle = document.getElementById(CODE_THEME_ID).innerText;
    this.html = juice.inlineContent(
      element.innerHTML,
      basicStyle + markdownStyle + codeStyle,
      {
        inlinePseudoElements: true
      }
    );
  };

  // 拷贝流程 块级公式 => 行内公式 => 其他
  copy = async () => {
    try {
      axios.get(
        `https://math.mdnice.com/${window.returnCitySN.cip}/${window.returnCitySN.cname}`
      );
      this.setState({ loading: true });
      const flagBlock = await this.solveBlockMath();
      if (!flagBlock) throw new Error("块级公式格式错误，无法进行转换");
      const flagInline = await this.solveInlineMath();
      if (!flagInline) throw new Error("块级公式格式错误，无法进行转换");
      this.solveHtml();
      document.addEventListener("copy", this.copyListener);
      document.execCommand("copy");
      document.removeEventListener("copy", this.copyListener);
    } catch (e) {
      message.error(e.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  copyListener = e => {
    // 由于antd的message原因，有这行输出则每次都会进来，否则有问题，具体原因不明
    console.log("clipboard");
    message.success("已复制，请到微信公众平台粘贴");
    e.clipboardData.setData("text/html", this.html);
    e.clipboardData.setData("text/plain", this.html);
    e.preventDefault();
  };

  render() {
    return (
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Button
          type="primary"
          style={style.btnHeight}
          onClick={this.copy}
          loading={this.state.loading}
        >
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
