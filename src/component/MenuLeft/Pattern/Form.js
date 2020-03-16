import React, {Component} from "react";
import {inject, observer} from "mobx-react";

import {hotKeys} from "../../../utils/hotkey";

import "../common.css";

@inject("dialog")
@observer
class Form extends Component {
  showModal = () => {
    this.props.dialog.setFormOpen(true);
  };

  render() {
    return (
      <div id="nice-menu-form" className="nice-menu-item" onClick={this.showModal}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">表格</span>
        </span>
        <span className="nice-menu-shortcut">{hotKeys.form}</span>
      </div>
    );
  }
}

export default Form;
