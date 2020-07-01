import React, {Component} from "react";
import {Modal} from "antd";

import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/css-hint";
import "antd/dist/antd.css";
import {observer, inject} from "mobx-react";

import "../utils/styleMirror.css";

@inject("content")
@inject("navbar")
@observer
class StyleEditor extends Component {
  constructor(props) {
    super(props);
    this.focus = false;
    this.modalShowing = false;
  }

  getStyleInstance = (instance) => {
    if (instance) {
      this.styleEditor = instance.editor;
      this.styleEditor.on("keyup", (cm, event) => {
        if ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode === 189) {
          cm.showHint({completeSingle: false});
        }
      });
    }
  };

  showConfirm = () => {
    if (this.modalShowing) {
      return;
    } else {
      this.modalShowing = true;
    }
    Modal.confirm({
      title: "是否想使用该模板？",
      content: "确定后将复制当前内容和样式并切换为自定义",
      cancelText: "取消",
      okText: "确定",
      onOk: () => {
        const {templateNum} = this.props.navbar;
        const {themeList} = this.props.content;
        const {css} = themeList[templateNum];
        const style = `/*自定义样式，实时生效*/\n\n` + css;
        this.props.content.setCustomStyle(style);
        this.props.navbar.setTemplateNum(themeList.length - 1);
        this.modalShowing = false;
      },
      onCancel: () => {
        this.modalShowing = false;
      },
    });
  };

  changeStyle = (editor) => {
    const {templateNum} = this.props.navbar;
    const {themeList} = this.props.content;
    // focus状态很重要，初始化时被调用则不会进入条件
    if (this.focus) {
      if (templateNum !== themeList.length - 1) {
        this.showConfirm();
      } else {
        const style = editor.getValue();
        this.props.content.setCustomStyle(style);
      }
    }
  };

  handleFocus = () => {
    this.focus = true;
  };

  handleBlur = () => {
    this.focus = false;
  };

  render() {
    return (
      <CodeMirror
        value={this.props.content.style}
        options={{
          theme: "style-mirror",
          keyMap: "sublime",
          mode: "css",
          lineWrapping: true,
          lineNumbers: false,
        }}
        id="css-editor"
        onChange={this.changeStyle}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={this.getStyleInstance}
      />
    );
  }
}

export default StyleEditor;
