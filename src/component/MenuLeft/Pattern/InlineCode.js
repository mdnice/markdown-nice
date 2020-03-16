import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import {inlineCode} from "../../../utils/editorKeyEvents";
import {hotKeys} from "../../../utils/hotkey";

import "../common.css";

@inject("content")
@observer
class InlineCode extends Component {
  handleClick = () => {
    const {markdownEditor} = this.props.content;
    const selection = markdownEditor.getSelection();
    inlineCode(markdownEditor, selection);

    // 上传后实时更新内容
    const content = markdownEditor.getValue();
    this.props.content.setContent(content);
    markdownEditor.focus();
  };

  render() {
    return (
      <div id="nice-menu-inline-code" className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">行内代码</span>
        </span>
        <span className="nice-menu-shortcut">{hotKeys.inlineCode}</span>
      </div>
    );
  }
}

export default InlineCode;
