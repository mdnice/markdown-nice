import React, {Component} from "react";
import {Menu, Dropdown} from "antd";

import SyncScroll from "./Setting/SyncScroll";
import ContainImgName from "./Setting/ContainImgName";

import "./common.css";

const menu = (
  <Menu>
    <Menu.Item>
      <SyncScroll />
    </Menu.Item>
    <Menu.Item>
      <ContainImgName />
    </Menu.Item>
  </Menu>
);

class Setting extends Component {
  render() {
    return (
      <Dropdown overlay={menu} trigger={["click"]} overlayClassName="nice-overlay">
        <a id="nice-menu-setting" className="nice-menu-link" href="#">
          设置
        </a>
      </Dropdown>
    );
  }
}

export default Setting;
