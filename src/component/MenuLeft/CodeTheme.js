import React from "react";
import {Menu, Dropdown} from "antd";
import {observer, inject} from "mobx-react";

import {CODE_OPTIONS, RIGHT_SYMBOL} from "../../utils/constant";
import "./CodeTheme.css";

@inject("navbar")
@observer
class CodeTheme extends React.Component {
  changeCodeTheme = (item) => {
    const codeNum = parseInt(item.key, 10);
    this.props.navbar.setCodeNum(codeNum);
  };

  render() {
    const {codeNum} = this.props.navbar;

    const codeMenu = (
      <Menu onClick={this.changeCodeTheme}>
        {CODE_OPTIONS.map((option, index) => (
          <Menu.Item key={index}>
            <div className="nice-codetheme-item">
              <span>
                <span className="nice-codetheme-item-flag">{codeNum === index && <span>{RIGHT_SYMBOL}</span>}</span>
                <span className="nice-codetheme-item-name">{option.name}</span>
              </span>
            </div>
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown overlay={codeMenu} trigger={["click"]} overlayClassName="nice-overlay">
        <a className="nice-menu-link" href="#">
          代码主题
        </a>
      </Dropdown>
    );
  }
}

export default CodeTheme;
