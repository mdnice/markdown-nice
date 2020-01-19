import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import "../common.css";

@inject("dialog")
@observer
class Link extends Component {
  showModal = () => {
    this.props.dialog.setLinkOpen(true);
  };

  render() {
    return (
      <div className="nice-menu-item" onClick={this.showModal}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">链接</span>
        </span>
        <span className="nice-menu-shortcut">⌘K</span>
      </div>
    );
  }
}

export default Link;
