import React, {Component} from "react";
import {Menu, Dropdown} from "antd";

import ExportFile from "./File/ExportFile";
import ImportFile from "./File/ImportFile";
import "./common.css";

const menu = (
  <Menu>
    <Menu.Item>
      <ExportFile />
    </Menu.Item>
    <Menu.Item>
      <ImportFile />
    </Menu.Item>
  </Menu>
);

class File extends Component {
  render() {
    return (
      <Dropdown overlay={menu} trigger={["click"]} overlayClassName="nice-overlay">
        <a className="nice-menu-link" href="#">
          文件
        </a>
      </Dropdown>
    );
  }
}

export default File;
