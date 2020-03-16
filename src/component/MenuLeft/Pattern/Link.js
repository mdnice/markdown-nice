import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import {hotKeys} from "../../../utils/hotkey";

import "../common.css";

@inject("dialog")
@observer
class Link extends Component {
  showModal = () => {
    this.props.dialog.setLinkOpen(true);
  };

  render() {
    return (
      <div id="nice-menu-link" className="nice-menu-item" onClick={this.showModal}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">链接</span>
        </span>
        <span className="nice-menu-shortcut">{hotKeys.link}</span>
      </div>
    );
  }
}

export default Link;
