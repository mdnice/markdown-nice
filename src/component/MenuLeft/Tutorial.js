import React, {Component} from "react";
import {Menu, Dropdown} from "antd";
import {observer, inject} from "mobx-react";

import "./common.css";
import {TUTORIALS} from "../../utils/constant";

@inject("dialog")
@observer
class Tutorial extends Component {
  handleClick = (e, item) => {
    this.props.dialog.setTutorialOpen(true);
    this.props.dialog.setTutorialTitle(item.title);
    this.props.dialog.setTutorialContent(item.content);
    this.props.dialog.setTutorialPicture(item.picture);
  };

  render() {
    const menu = (
      <Menu>
        {TUTORIALS.map((item, index) => (
          <Menu.Item key={index}>
            <div
              id={"nice-menu-tutorial-" + index}
              className="nice-menu-item"
              onClick={(e) => {
                this.handleClick(e, item);
              }}
            >
              <span>
                <span className="nice-menu-flag" />
                <span className="nice-menu-name">{item.title}</span>
              </span>
            </div>
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={["click"]} overlayClassName="nice-overlay">
        <a id="nice-menu-tutorial" className="nice-menu-link" href="#">
          教程
        </a>
      </Dropdown>
    );
  }
}

export default Tutorial;
