import React, {Component} from "react";
import {Menu, Dropdown} from "antd";

import ExportMarkdown from "./File/ExportMarkdown";
import ExportPdf from "./File/ExportPdf";
import ImportFile from "./File/ImportFile";
import ImportNotion from "./File/ImportNotion";
import "./common.css";

const menu = (
  <Menu>
    <Menu.Item>
      <ImportFile />
    </Menu.Item>

    <Menu.Item>
      <ImportNotion />
    </Menu.Item>

    <Menu.Divider />

    <Menu.Item>
      <ExportMarkdown />
    </Menu.Item>
    <Menu.Item>
      <ExportPdf />
    </Menu.Item>
  </Menu>
);

class File extends Component {
  render() {
    return (
      <Dropdown overlay={menu} trigger={["click"]} overlayClassName="nice-overlay">
        <a id="nice-menu-file" className="nice-menu-link" href="#">
          文件
        </a>
      </Dropdown>
    );
  }
}

export default File;
