import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import {parseLinkToFoot} from "../../../utils/editorKeyEvents";

import "../common.css";

@inject("content")
@observer
class Format extends Component {
  handleFormat = () => {
    const {content} = this.props.content;
    parseLinkToFoot(content, this.props.content);
  };

  render() {
    return (
      <div className="nice-menu-item" onClick={this.handleFormat}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">微信外链转脚注</span>
        </span>
        <span className="nice-menu-shortcut">⌘⌥L</span>
      </div>
    );
  }
}

export default Format;
