import React, { Component } from "react";
import axios from "axios";
import Navbar from "./layout/Navbar";

import CodeMirror from "@uiw/react-codemirror";
import markdownIt from "markdown-it";
import markdownItSup from "markdown-it-sup";
import markdownItFootnote from "markdown-it-footnote";
import markdownItSub from "markdown-it-sub";
import markdownItDeflist from "markdown-it-deflist";
import markdownItSpan from "./utils/span";

import highlightjs from "highlight.js";
import juice from "juice";
import "codemirror/keymap/sublime";
import "./utils/base16-light.css";

import { Tooltip, Button, Icon, message } from "antd";
import "antd/dist/antd.css";

import "./App.css";

import copyIcon from "./icon/copy.svg";

import { observer, inject } from "mobx-react";

const success = () => {
  message.success('已复制，请到微信公众平台粘贴');
};

@inject("content")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      markedText: "",
      cssStyle: "",
      resultHtml: ""
    };

    this.md = new markdownIt({
      highlight: (str, lang) => {
        if (lang && highlightjs.getLanguage(lang)) {
          try {
            return (
              '<pre ><code class="hljs">' +
              highlightjs.highlight(lang, str, true).value +
              "</code></pre>"
            );
          } catch (__) {}
        }
        return (
          '<pre ><code class="hljs">' +
          this.md.utils.escapeHtml(str) +
          "</code></pre>"
        );
      }
    });

    this.md
      .use(markdownItSpan) // 在标题标签中添加span
      .use(markdownItSup) // 上标
      .use(markdownItFootnote) // 脚注
      .use(markdownItSub) // 下标
      .use(markdownItDeflist); // 定义列表

    this.scale = 1;
    // this.hasContentChanged = true;
  }

  setCurrentIndex(index) {
    this.index = index;
  }

  getInstance = instance => {
    if (instance) {
      this.codemirror = instance.codemirror;
      this.editor = instance.editor;
    }
  };

  containerScroll = () => {
    let cmData = this.editor.getScrollInfo();
    let editorToTop = cmData.top;
    let editorScrollHeight = cmData.height - cmData.clientHeight;
    // console.log('top:', editorToTop, 'editorScrollHeight:', editorScrollHeight);
    // this.hasContentChanged && this.setScrollValue(editorScrollHeight);
    this.scale =
      (this.previewWrap.offsetHeight -
        this.previewContainer.offsetHeight +
        55) /
      editorScrollHeight;
    // console.log('(this.previewWrap.offsetHeight:', this.previewWrap.offsetHeight, 'this.previewContainer.offsetHeight:', this.previewContainer.offsetHeight)
    // console.log(this.previewContainer.scrollTop);
    if (this.index === 1) {
      this.previewContainer.scrollTop = editorToTop * this.scale;
    } else {
      this.editorTop = this.previewContainer.scrollTop / this.scale;
      this.editor.scrollTo(null, this.editorTop);
    }
  };

  changeContent = (editor, changeObj) => {
    const editorContent = editor.getValue();
    const markedContent = this.md.render(editorContent);
    this.props.content.updateContent(editorContent);
    this.setState({
      markedText: markedContent
    });
  };

  getCss = async () => {
    try {
      const basicEl = document.getElementById("basic-theme");
      const basicStyle = basicEl.href;
      const basicRes = await axios.get(basicStyle);

      const mdEl = document.getElementById("markdown-theme");
      const mdStyle = mdEl.href;
      const mdRes = await axios.get(mdStyle);

      const codeEl = document.getElementById("code-theme");
      const codeStyle = codeEl.href;
      const codeRes = await axios.get(codeStyle);

      const htmlStr = `<section class="layout">${
        this.state.markedText
      }</section>`;
      const result = juice.inlineContent(htmlStr, basicRes.data + mdRes.data + codeRes.data, {
        inlinePseudoElements: true
      });
      this.setState({ resultHtml: result });
      console.log(result);
      this.copyToClip(result);
      success()
    } catch (error) {
      console.error(error);
    }
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
      <div className="App">
        <Navbar />

        <div className="text-container">
          <div
            className="text-box"
            onMouseOver={e => this.setCurrentIndex(1, e)}
          >
            <CodeMirror
              value={this.props.content.commitContent}
              options={{
                theme: "base16-light",
                keyMap: "sublime",
                mode: "markdown",
                lineWrapping: true,
                autofocus: true
              }}
              id="marked-editor"
              onChange={this.changeContent}
              onScroll={this.containerScroll}
              ref={this.getInstance}
            />
          </div>

          <div
            id="marked-text"
            className="text-box"
            onMouseOver={e => this.setCurrentIndex(2, e)}
          >
            <div
              className="wx-box"
              onScroll={this.containerScroll}
              ref={node => (this.previewContainer = node)}
            >
              <section
                className="layout"
                dangerouslySetInnerHTML={{ __html: this.state.markedText }}
                ref={node => (this.previewWrap = node)}
              />
            </div>
          </div>

          <Tooltip
            placement="bottom"
            mouseEnterDelay={0.5}
            mouseLeaveDelay={0.2}
            title="点击复制"
          >
            <Button
              style={{ padding: "0 8px", color: "orange" }}
              className="getBtn"
              onClick={this.getCss}
            >
              <Icon component={copyIcon} style={{ fontSize: "18px" }} />
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default App;
