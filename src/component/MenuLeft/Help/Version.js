import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import "../common.css";

@inject("dialog")
@observer
class Version extends Component {
  handleClick = () => {
    this.props.dialog.setVersionOpen(true);
  };

  render() {
    return (
      <div id="nice-menu-version" className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">版本信息</span>
        </span>
      </div>
    );
  }
}

export default Version;
