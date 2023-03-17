import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import "../common.css";

@inject("dialog")
@observer
class ImportNotionFunction extends Component {
  handleClick = () => {
    this.props.dialog.setImportNotionOpen(true);
  };

  render() {
    return (
      <div id="nice-menu-importnotion" className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">导入Notion文档</span>
        </span>
      </div>
    );
  }
}

export default ImportNotionFunction;
