import React, {Component} from "react";
import {Menu, Dropdown} from "antd";

import Export from "./File/Export";
import Import from "./File/Import";
import "./common.css";

const menu = (
  <Menu>
    <Menu.Item>
      <Export />
    </Menu.Item>
    <Menu.Item>
      <Import />
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
