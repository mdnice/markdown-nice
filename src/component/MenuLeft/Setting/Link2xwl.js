import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import {RIGHT_SYMBOL} from "../../../utils/constant";
import "../common.css";

@inject("navbar")
@observer
class Link2xwl extends Component {
  handleClick = () => {
    const {isLink2xwl} = this.props.navbar;
    this.props.navbar.setLink2xwl(!isLink2xwl);
  };

  render() {
    return (
      <div id="nice-menu-contain-img-name" className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag">{this.props.navbar.isLink2xwl && <span>{RIGHT_SYMBOL}</span>}</span>
          <span className="nice-menu-name">微信外链支持[小外链]</span>
        </span>
      </div>
    );
  }
}

export default Link2xwl;
