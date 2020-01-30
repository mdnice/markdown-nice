import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import "../common.css";

@inject("dialog")
@observer
class Search extends Component {
  handleClick = () => {
    this.props.dialog.setSearchOpen(!this.props.dialog.isSearchOpen);
  };

  render() {
    return (
      <div className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">查找</span>
        </span>
        <span className="nice-menu-shortcut">⌘F</span>
      </div>
    );
  }
}

export default Search;
