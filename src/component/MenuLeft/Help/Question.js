import React, {Component} from "react";

import "../common.css";

class Question extends Component {
  handleClick = () => {
    const w = window.open("about:blank");
    w.location.href = "https://preview.mdnice.com/article/user/solve/";
  };

  render() {
    return (
      <div id="nice-menu-question" className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">我要提问</span>
        </span>
      </div>
    );
  }
}

export default Question;
