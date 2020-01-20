import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import "../common.css";

@inject("content")
@observer
class Del extends Component {
  handleClick = () => {
    const {markdownEditor} = this.props.content;
    const cursor = markdownEditor.getCursor();
    const selection = markdownEditor.getSelection();
    const text = `~~${selection}~~`;
    markdownEditor.replaceSelection(text, cursor);

    // 上传后实时更新内容
    const content = markdownEditor.getValue();
    this.props.content.setContent(content);
  };

  render() {
    return (
      <div className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">删除线</span>
        </span>
        <span className="nice-menu-shortcut">⌘U</span>
      </div>
    );
  }
}

export default Del;
