import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import {bold} from "../../../utils/editorKeyEvents";
import {hotKeys} from "../../../utils/hotkey";

import "../common.css";

@inject("content")
@observer
class Bold extends Component {
  handleClick = () => {
    const {markdownEditor} = this.props.content;
    const selection = markdownEditor.getSelection();
    bold(markdownEditor, selection);

    // 上传后实时更新内容
    const content = markdownEditor.getValue();
    this.props.content.setContent(content);
    markdownEditor.focus();
  };

  render() {
    return (
      <div id="nice-menu-bold" className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">加粗</span>
        </span>

        <span className="nice-menu-shortcut">{hotKeys.bold}</span>
      </div>
    );
  }
}

export default Bold;
