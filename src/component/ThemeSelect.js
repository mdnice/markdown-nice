import React from "react";
import {Button, Menu, Dropdown, Switch} from "antd";
import {observer, inject} from "mobx-react";

import {TEMPLATE_OPTIONS, CODE_OPTIONS, TEMPLATE_CUSTOM_NUM} from "../utils/constant";
import TEMPLATE from "../template/index";
import SvgIcon from "../icon";

@inject("content")
@inject("navbar")
@observer
class ThemeSelect extends React.Component {
  changeTemplate = (item) => {
    console.log(item);
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
            <div style={style.themeItem}>
              <span style={style.themeItemName}>{option.name}</span>

              <span style={style.themeItemAuthor}>{option.author}</span>
            </div>
          </Menu.Item>
        ))}
        <Menu.Divider />
        <div style={style.menuItem}>
          <div style={style.themeItem}>
            <span style={style.themeItemName}>查看主题 CSS</span>

            <span style={style.themeItemAuthor}>
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
    const mdMenuStyle = templateNum === TEMPLATE_CUSTOM_NUM ? style.mdCutomMenu : style.mdMenu;

    return (
      <div>
        <Dropdown overlay={mdMenu} placement="bottomCenter">
          <Button style={mdMenuStyle}>
            {TEMPLATE_OPTIONS[templateNum].name}
            <i className="anticon anticon-down">
              <SvgIcon name="down" style={style.svgIcon} />
            </i>
          </Button>
        </Dropdown>
        <Dropdown overlay={codeMenu} placement="bottomCenter">
          <Button style={style.codeMenu}>
            {CODE_OPTIONS[codeNum].name}
            <i className="anticon anticon-down">
              <SvgIcon name="down" style={style.svgIcon} />
            </i>
          </Button>
        </Dropdown>
      </div>
    );
  }
}

const style = {
  mdCutomMenu: {
    marginLeft: 8,
    border: "1px dashed #1890ff",
  },
  mdMenu: {
    marginLeft: 8,
  },
  codeMenu: {
    marginLeft: 8,
    marginRight: 8,
  },
  themeItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  themeItemAuthor: {
    color: "gray",
  },
  themeItemName: {
    marginRight: "10px",
  },
  svgIcon: {
    width: "18px",
    height: "18px",
  },
  layout: {
    display: "flex",
    alignItems: "center",
  },
  menuItem: {
    clear: "both",
    margin: 0,
    padding: "5px 12px",
    color: "rgba(0, 0, 0, 0.65)",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "22px",
    whiteSpace: "nowrap",
    cursor: "pointer",
  },
};

export default ThemeSelect;
