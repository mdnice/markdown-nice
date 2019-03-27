import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "./layout/navbar";

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
import "codemirror/theme/base16-light.css";

import { Tooltip, Button, Icon } from "antd";
import "antd/dist/antd.css";
import copyIcon from "./icon/copy.svg";

import { observer, inject } from "mobx-react";

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
    // 在标题标签中添加span
    this.md
      .use(markdownItSpan)
      // 上标
      .use(markdownItSup)
      // 脚注
      .use(markdownItFootnote)
      // 下标
      .use(markdownItSub)
      // 定义列表
      .use(markdownItDeflist);

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
        44) /
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
    let editorContent = editor.getValue();
    let markedContent = this.md.render(editorContent);
    this.props.content.updateContent(editorContent);
    this.setState({
      markedText: markedContent
    });
  };

  getCss = async () => {
    try {
      let mdEl = document.getElementById("markdown-theme");
      let mdStyle = mdEl.href;
      const mdRes = await axios.get(mdStyle);

      let codeEl = document.getElementById("code-theme");
      let codeStyle = codeEl.href;
      const codeRes = await axios.get(codeStyle);

      let htmlStr = `<section class="output_wrapper">${
        this.state.markedText
      }</section>`;
      let result = juice.inlineContent(htmlStr, mdRes.data + codeRes.data, {
        inlinePseudoElements: true
      });
      this.setState({ resultHtml: result });
      console.log(result);
      this.copyToClip(result);
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
              <div
                className="output_wrapper"
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
