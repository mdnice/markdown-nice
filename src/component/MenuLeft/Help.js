import React, {Component} from "react";
import {Menu, Dropdown} from "antd";

import About from "./Help/About";
import Version from "./Help/Version";

import "./common.css";

const menu = (
  <Menu>
    <Menu.Item>
      <About />
    </Menu.Item>
    <Menu.Item>
      <Version />
    </Menu.Item>
  </Menu>
);

class Help extends Component {
  render() {
    return (
      <Dropdown overlay={menu} trigger={["click"]} overlayClassName="nice-overlay">
        <a className="nice-menu-link" href="#">
          帮助
        </a>
      </Dropdown>
    );
  }
}

export default Help;
