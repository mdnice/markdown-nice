import React, {Component} from "react";
import {Menu, Dropdown} from "antd";

import Bold from "./Pattern/Bold";
import Code from "./Pattern/Code";
import Del from "./Pattern/Del";
import Italic from "./Pattern/Italic";
import Link from "./Pattern/Link";
import Form from "./Pattern/Form";
import Image from "./Pattern/Image";
import Format from "./Pattern/Format";
import "./common.css";

const menu = (
  <Menu>
    <Menu.Item>
      <Del />
    </Menu.Item>
    <Menu.Item>
      <Bold />
    </Menu.Item>
    <Menu.Item>
      <Italic />
    </Menu.Item>
    <Menu.Item>
      <Code />
    </Menu.Item>

    <Menu.Divider />

    <Menu.Item>
      <Link />
    </Menu.Item>
    <Menu.Item>
      <Form />
    </Menu.Item>
    <Menu.Item>
      <Image />
    </Menu.Item>

    <Menu.Divider />

    <Menu.Item>
      <Format />
    </Menu.Item>
  </Menu>
);

class Pattern extends Component {
  render() {
    return (
      <Dropdown overlay={menu} trigger={["click"]} overlayClassName="nice-overlay">
        <a className="nice-menu-link" href="#">
          格式
        </a>
      </Dropdown>
    );
  }
}

export default Pattern;
