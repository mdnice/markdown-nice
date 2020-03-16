import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import {RIGHT_SYMBOL} from "../../../utils/constant";
import "../common.css";

@inject("view")
@observer
class PreviewArea extends Component {
  handleClick = () => {
    const {isPreviewAreaOpen} = this.props.view;
    this.props.view.setPreviewAreaOpen(!isPreviewAreaOpen);
  };

  render() {
    return (
      <div id="nice-menu-preview-area" className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag">{this.props.view.isPreviewAreaOpen && <span>{RIGHT_SYMBOL}</span>}</span>
          <span className="nice-menu-name">预览区域</span>
        </span>
      </div>
    );
  }
}

export default PreviewArea;
