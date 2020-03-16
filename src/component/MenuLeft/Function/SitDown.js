import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import "../common.css";

@inject("dialog")
@observer
class SitDownFunction extends Component {
  handleClick = () => {
    this.props.dialog.setSitDownOpen(true);
  };

  render() {
    return (
      <div id="nice-menu-sitdown" className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">SitDown</span>
        </span>
      </div>
    );
  }
}

export default SitDownFunction;
