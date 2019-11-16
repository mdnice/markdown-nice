import React from "react";
import {Button, Menu, Dropdown, Switch} from "antd";
import {observer, inject} from "mobx-react";

import {TEMPLATE_OPTIONS, CODE_OPTIONS, TEMPLATE_CUSTOM_NUM} from "../../utils/constant";
import TEMPLATE from "../../template/index";
import SvgIcon from "../../icon";
import "./ThemeSelect.css";

@inject("content")
@inject("navbar")
@observer
class ThemeSelect extends React.Component {
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

  changeCodeTheme = (item) => {
    const codeNum = parseInt(item.key, 10);
    this.props.navbar.setCodeNum(codeNum);
  };

  toggleStyleEditor = (checked) => {
    this.props.navbar.setStyleEditorOpen(checked);
  };

  render() {
    const mdMenu = (
      <Menu onClick={this.changeTemplate}>
        {TEMPLATE_OPTIONS.map((option, index) => (
          <Menu.Item key={index}>
            <div className="nice-themeselect-theme-item">
              <span className="nice-themeselect-theme-item-name">{option.name}</span>

              <span className="nice-themeselect-theme-item-author">{option.author}</span>
            </div>
          </Menu.Item>
        ))}
        <Menu.Divider />
        <div className="nice-themeselect-menu-item">
          <div className="nice-themeselect-theme-item">
            <span className="nice-themeselect-theme-item-name">查看主题 CSS</span>

            <span className="nice-themeselect-theme-item-author">
              <Switch checked={this.props.navbar.isStyleEditorOpen} size="small" onChange={this.toggleStyleEditor} />
            </span>
          </div>
        </div>
      </Menu>
    );
    const codeMenu = (
      <Menu onClick={this.changeCodeTheme}>
        {CODE_OPTIONS.map((option, index) => (
          <Menu.Item key={index}>{option.name}</Menu.Item>
        ))}
      </Menu>
    );

    // 自定义则加上特殊描边
    const {templateNum, codeNum} = this.props.navbar;
    const mdMenuStyle =
      templateNum === TEMPLATE_CUSTOM_NUM ? "nice-themeselect-md-cutom-menu" : "nice-themeselect-md-menu";

    return (
      <div>
        <Dropdown overlay={mdMenu} placement="bottomCenter">
          <Button className={mdMenuStyle}>
            {TEMPLATE_OPTIONS[templateNum].name}
            <i className="anticon anticon-down">
              <SvgIcon name="down" className="nice-themeselect-icon" />
            </i>
          </Button>
        </Dropdown>
        <Dropdown overlay={codeMenu} placement="bottomCenter">
          <Button className="nice-themeselect-code-menu">
            {CODE_OPTIONS[codeNum].name}
            <i className="anticon anticon-down">
              <SvgIcon name="down" className="nice-themeselect-icon" />
            </i>
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default ThemeSelect;
