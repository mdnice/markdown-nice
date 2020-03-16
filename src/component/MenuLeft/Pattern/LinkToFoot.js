import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import {parseLinkToFoot} from "../../../utils/editorKeyEvents";
import {hotKeys} from "../../../utils/hotkey";

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
      <div id="nice-menu-link-to-foot" className="nice-menu-item" onClick={this.handleFormat}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">微信外链转脚注</span>
        </span>
        <span className="nice-menu-shortcut">{hotKeys.linkToFoot}</span>
      </div>
    );
  }
}

export default Format;
