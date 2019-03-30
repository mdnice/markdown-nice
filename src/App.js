import React, { Component } from "react";
import { Modal } from "antd";

import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "antd/dist/antd.css";
import { observer, inject } from "mobx-react";

import Dialog from "./layout/Dialog";
import Navbar from "./layout/Navbar";
import StyleEditor from "./layout/StyleEditor";

import "./App.css";
import "./utils/mdMirror.css";

import { markdownParser, replaceStyle } from "./utils/helper";
import { BASIC_THEME_ID, MARKDOWN_THEME_ID } from "./utils/constant";
import THEMES from "./theme/index";

@inject("content")
@inject("navbar")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.focus = false;
    this.scale = 1;
    // 初始化整体主题
    replaceStyle(BASIC_THEME_ID, THEMES.basic);
  }

  setCurrentIndex(index) {
    this.index = index;
  }

  getInstance = instance => {
    if (instance) {
      this.props.content.setMarkdownEditor(instance.editor);
    }
  };

  handleScroll = () => {
    const { markdownEditor } = this.props.content
    let cmData = markdownEditor.getScrollInfo();
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
      markdownEditor.scrollTo(null, this.editorTop);
    }
  };

  handlChange = (editor, changeObj) => {
    const content = editor.getValue();
    this.props.content.setContent(content);
  };

  getStyleInstance = instance => {
    if (instance) {
      this.styleEditor = instance.editor;
      this.styleEditor.on("keyup", (cm, e) => {
        if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 189) {
          cm.showHint(e);
        }
      });
    }
  };

  showConfirm = () => {
    Modal.confirm({
      title: "是否想自定义主题？",
      content: "确定后将复制当前主题并切换为自定义",
      cancelText: "取消",
      okText: "确定",
      onOk: () => {
        const { markdownId } = this.props.navbar;
        const style =
          `/*自定义样式，实时生效*/\n\n` + THEMES.markdown[markdownId];
        replaceStyle(MARKDOWN_THEME_ID, style);
        this.props.content.setCustomStyle(style);
        this.props.navbar.setMarkdownName("自定义");
        this.props.navbar.setMarkdownId("custom");
      },
      onCancel: () => {}
    });
  };

  changeStyle = (editor, changeObj) => {
    // focus状态很重要，初始化时被调用则不会进入条件
    if (this.focus && this.props.navbar.markdownId !== "custom") {
      this.showConfirm();
    } else if (this.focus) {
      const style = editor.getValue();
      replaceStyle(MARKDOWN_THEME_ID, style);
      this.props.content.setCustomStyle(style);
    }
  };

  handleFocus = e => {
    this.focus = true;
  };

  handleBlur = e => {
    this.focus = false;
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
              value={this.props.content.content}
              options={{
                theme: "md-mirror",
                keyMap: "sublime",
                mode: "markdown",
                lineWrapping: true,
                lineNumbers: false
              }}
              onChange={this.handlChange}
              onScroll={this.handleScroll}
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
              onScroll={this.handleScroll}
              ref={node => (this.previewContainer = node)}
            >
              <section
                className="layout"
                dangerouslySetInnerHTML={{
                  __html: markdownParser.render(this.props.content.content)
                }}
                ref={node => (this.previewWrap = node)}
              />
            </div>
          </div>

          {this.props.navbar.isStyleEditorOpen ? (
            <div className="text-box">
              <StyleEditor />
            </div>
          ) : null}

          <Dialog />
        </div>
      </div>
    );
  }
}

export default App;
