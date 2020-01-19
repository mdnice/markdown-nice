import React from "react";
import {Menu, Dropdown} from "antd";
import {observer, inject} from "mobx-react";

import {TEMPLATE_OPTIONS, RIGHT_SYMBOL} from "../../utils/constant";
import TEMPLATE from "../../template/index";
import "./Theme.css";

@inject("content")
@inject("navbar")
@observer
class Theme extends React.Component {
  changeTemplate = (item) => {
    const index = parseInt(item.key, 10);
    const {id} = TEMPLATE_OPTIONS[index];
    this.props.navbar.setTemplateNum(index);

    // 更新style编辑器
    if (id === "custom") {
      this.props.content.setCustomStyle();
      // 切换自定义自动打开css编辑
      this.props.navbar.setStyleEditorOpen(true);
    } else {
      this.props.content.setStyle(TEMPLATE.style[id]);
    }
  };

  toggleStyleEditor = () => {
    const {isStyleEditorOpen} = this.props.navbar;
    this.props.navbar.setStyleEditorOpen(!isStyleEditorOpen);
  };

  render() {
    const {templateNum} = this.props.navbar;

    const mdMenu = (
      <Menu onClick={this.changeTemplate}>
        {TEMPLATE_OPTIONS.map((option, index) => (
          <Menu.Item key={index}>
            <div className="nice-themeselect-theme-item">
              <span>
                <span className="nice-themeselect-theme-item-flag">
                  {templateNum === index && <span>{RIGHT_SYMBOL}</span>}
                </span>
                <span className="nice-themeselect-theme-item-name">{option.name}</span>
              </span>
              <span className="nice-themeselect-theme-item-author">{option.author}</span>
            </div>
          </Menu.Item>
        ))}
        <Menu.Divider />
        <li className="nice-themeselect-menu-item">
          <div className="nice-themeselect-theme-item" onClick={this.toggleStyleEditor}>
            <span>
              <span className="nice-themeselect-theme-item-flag">
                {this.props.navbar.isStyleEditorOpen && <span>{RIGHT_SYMBOL}</span>}
              </span>
              <span className="nice-themeselect-theme-item-name">查看主题 CSS</span>
            </span>
          </div>
        </li>
      </Menu>
    );
    return (
      <Dropdown overlay={mdMenu} trigger={["click"]} overlayClassName="nice-overlay">
        <a className="nice-menu-link" href="#">
          主题
        </a>
      </Dropdown>
    );
  }
}

export default Theme;
