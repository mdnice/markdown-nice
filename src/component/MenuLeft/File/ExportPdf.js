import React, {Component} from "react";

import "../common.css";

class ExportPdf extends Component {
  handleClick = () => {
    setTimeout(() => {
      window.print();
    }, 500);
  };

  render() {
    return (
      <div id="nice-menu-export-pdf" className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">导出 PDF</span>
        </span>
      </div>
    );
  }
}

export default ExportPdf;
