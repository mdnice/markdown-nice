import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import "../common.css";

@inject("dialog")
@observer
class About extends Component {
  handleClick = () => {
    this.props.dialog.setAboutOpen(true);
  };

  render() {
    return (
      <div id="nice-menu-about" className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">关于</span>
        </span>
      </div>
    );
  }
}

export default About;
