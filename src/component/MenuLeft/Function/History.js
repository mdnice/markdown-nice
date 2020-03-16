import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import "../common.css";

@inject("dialog")
@observer
class History extends Component {
  handleClick = () => {
    this.props.dialog.setHistoryOpen(true);
  };

  render() {
    return (
      <div id="nice-menu-history" className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">本地历史</span>
        </span>
      </div>
    );
  }
}

export default History;
