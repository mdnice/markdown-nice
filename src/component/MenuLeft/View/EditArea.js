import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import {RIGHT_SYMBOL} from "../../../utils/constant";
import "../common.css";

@inject("view")
@observer
class EditArea extends Component {
  handleClick = () => {
    const {isEditAreaOpen} = this.props.view;
    this.props.view.setEditAreaOpen(!isEditAreaOpen);
  };

  render() {
    return (
      <div id="nice-menu-edit-area" className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag">{this.props.view.isEditAreaOpen && <span>{RIGHT_SYMBOL}</span>}</span>
          <span className="nice-menu-name">编辑区域</span>
        </span>
      </div>
    );
  }
}

export default EditArea;
