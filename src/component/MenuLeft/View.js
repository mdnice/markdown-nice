import React, {Component} from "react";
import {Menu, Dropdown} from "antd";

import FullScreen from "./View/FullScreen";
import EditArea from "./View/EditArea";
import PreviewArea from "./View/PreviewArea";
import ThemeArea from "./View/ThemeArea";

import "./common.css";

const menu = (
  <Menu>
    <Menu.Item>
      <FullScreen />
    </Menu.Item>

    <Menu.Divider />

    <Menu.Item>
      <EditArea />
    </Menu.Item>
    <Menu.Item>
      <PreviewArea />
    </Menu.Item>
    <Menu.Item>
      <ThemeArea />
    </Menu.Item>
  </Menu>
);

class View extends Component {
  render() {
    return (
      <Dropdown overlay={menu} trigger={["click"]} overlayClassName="nice-overlay">
        <a id="nice-menu-view" className="nice-menu-link" href="#">
          查看
        </a>
      </Dropdown>
    );
  }
}

export default View;
