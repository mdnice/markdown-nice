import React, {Component} from "react";
import juice from "juice";
import {observer, inject} from "mobx-react";
import {Button, message, ConfigProvider, notification, Modal} from "antd";

import {BASIC_THEME_ID, CODE_THEME_ID, MARKDOWN_THEME_ID, IS_PRETTIER_OPEN} from "../utils/constant";

import {axiosMdnice} from "../utils/helper";

import prettier from "prettier/standalone";
import prettierMarkdown from "prettier/parser-markdown";

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
      loading: false,
    };
  }

  // 形成结果 <div class="katex-display"><img class="math-img-block"/></div>
  solveBlockMath = async () => {
    const mathReg = /\$\$(((?!`)[^])*?)\$\$/g; // 中间不能包含`符号
    const {content} = this.props.content;

    let mathBlock = content.match(mathReg);
    const tagsBlock = document.getElementsByClassName("katex-display");
    if (mathBlock != null) {
      if (mathBlock.length !== tagsBlock.length) {
        const codes = document.getElementsByTagName("code");
        let text = "";
        for (const code of codes) {
          text += code.innerText;
        }
        // console.log(mathBlock);
        mathBlock = mathBlock.filter((math) => !text.includes(math));
        // 经过转换后依然不相等则报错
        if (mathBlock.length !== tagsBlock.length) {
          return false;
        }
      }

      const urlArr = [];
      for (let i = 0; i < mathBlock.length; i++) {
        // 转换过的公式避免再次转换
        if (tagsBlock[i].firstChild.className === "math-img-block") continue;
        const math = mathBlock[i];
        let formula = math.split("$$")[1];
        formula = encodeURI(formula.replace(/\s/g, "&space;"));
        const url = `/math/type/png/scale/${this.scale}/math/${formula}`;
        urlArr.push(url);
      }

      // 使用promise并行发请求，增快公式转换速度
      const promiseArr = urlArr.map((url) => axiosMdnice.get(url));

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
    const mathReg = /\$(\S*?)\$/g; // 这里的空格处理会导致问题？？？bug
    const {content} = this.props.content;

    let mathInline = content.match(mathReg);
    if (mathInline == null) mathInline = [];
    mathInline = mathInline.filter((item) => item !== "$$"); // 过滤掉匹配的$$没用符号

    const tagsInline = document.getElementsByClassName("katex");

    if (mathInline.length !== tagsInline.length) {
      const codes = document.getElementsByTagName("code");
      let text = "";
      for (const code of codes) {
        text += code.innerText;
      }
      mathInline = mathInline.filter((math) => !text.includes(math));
      if (mathInline.length !== tagsInline.length) {
        const args = {
          message: "检测到的无问题公式",
          description: (
            <div>
              {mathInline.map((val) => (
                <p style={style.mathNotify}>{val}</p>
              ))}
              <p style={style.mathNotify}>提示：请检查其他行内公式是否包含空格或中文</p>
            </div>
          ),
          duration: 0,
        };
        notification.open(args);
        return false;
      }
    }

    const urlArr = [];
    for (let i = 0; i < mathInline.length; i++) {
      // 转换过的公式避免再次转换
      if (tagsInline[i].firstChild.className === "math-img-inline") continue;
      const math = mathInline[i];
      let formula = math.split("$")[1];
      formula = encodeURI(formula.replace(/\s/g, "&space;").replace(/\//g, "&divide;"));
      const url = `/math/type/png/scale/${this.scale}/math/${formula}`;
      urlArr.push(url);
    }
    // 使用promise并行发请求，增快公式转换速度
    const promiseArr = urlArr.map((url) => axiosMdnice.get(url));

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

    return true;
  };

  solveHtml = () => {
    const element = document.getElementById("wx-box");
    const basicStyle = document.getElementById(BASIC_THEME_ID).innerText;
    const markdownStyle = document.getElementById(MARKDOWN_THEME_ID).innerText;
    const codeStyle = document.getElementById(CODE_THEME_ID).innerText;
    this.html = juice.inlineContent(element.innerHTML, basicStyle + markdownStyle + codeStyle, {
      inlinePseudoElements: true,
    });
  };

  // 拷贝流程 块级公式 => 行内公式 => 其他
  copy = async () => {
    try {
      const flagBlock = await this.solveBlockMath();
      if (!flagBlock) throw new Error("块级公式格式错误，无法进行转换");
      const flagInline = await this.solveInlineMath();
      if (!flagInline) throw new Error("行内公式格式错误，无法进行转换");
    } catch (e) {
      message.error(e.message);
    } finally {
      this.solveHtml();
      document.addEventListener("copy", this.copyListener);
      document.execCommand("copy");
      document.removeEventListener("copy", this.copyListener);
      this.setState({loading: false});
    }
  };

  prettierDoc = () => {
    // 变更状态
    this.setState({loading: true});
    const {isPrettierOpen} = this.props.navbar;
    if (isPrettierOpen) {
      const {content} = this.props.content;
      const prettierRes = prettier.format(content, {
        parser: "markdown",
        plugins: [prettierMarkdown],
      });
      // 当格式化之后和原文不同时才提示
      if (prettierRes !== content) {
        this.showConfirm(prettierRes);
      } else {
        this.copy();
      }
    } else {
      this.copy();
    }
  };

  showConfirm = (prettierRes) => {
    Modal.confirm({
      title: "检测到不规范排版",
      content: "当前 markdown 文档排版不规范（比如中英文空格），是否一键排版后复制？",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        this.props.content.setContent(prettierRes);
        this.copy();
      },
      onCancel: () => {
        this.copy();
      },
    });
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
        <Button type="primary" style={style.btnHeight} onClick={this.prettierDoc} loading={this.state.loading}>
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
};

export default Copy;
