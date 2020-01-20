import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import "../common.css";

@inject("content")
@inject("dialog")
@observer
class Image extends Component {
  showModal = () => {
    this.props.dialog.setImageOpen(true);
  };

  render() {
    return (
      <div className="nice-menu-item" onClick={this.showModal}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">图片</span>
        </span>
        <span className="nice-menu-shortcut">⌘⌥I</span>
      </div>
    );
  }
}

export default Image;
