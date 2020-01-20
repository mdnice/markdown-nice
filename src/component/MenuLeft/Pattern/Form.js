import React, {Component} from "react";
import {inject, observer} from "mobx-react";

import "../common.css";

@inject("dialog")
@observer
class Form extends Component {
  showModal = () => {
    this.props.dialog.setFormOpen(true);
  };

  render() {
    return (
      <div className="nice-menu-item" onClick={this.showModal}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">表格</span>
        </span>
        <span className="nice-menu-shortcut">⌘⌥T</span>
      </div>
    );
  }
}

export default Form;
