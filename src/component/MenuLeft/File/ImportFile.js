import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import "../common.css";

@inject("content")
@observer
class ImportFile extends Component {
  handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      this.props.content.setContent(event.target.result);
    };
    reader.readAsText(file);
  };

  render() {
    return (
      <label className="nice-menu-item" htmlFor="importFile">
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">导入</span>
          <input
            style={{display: "none"}}
            type="file"
            id="importFile"
            accept=".txt,.md"
            hidden=""
            onChange={this.handleChange}
          />
        </span>
      </label>
    );
  }
}

export default ImportFile;
