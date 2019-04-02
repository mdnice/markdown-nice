import React from "react";
import { Button, Icon, Menu, Dropdown, Switch, Tooltip } from "antd";
import { observer, inject } from "mobx-react";

import {
  TEMPLATE_OPTIONS,
  CODE_OPTIONS,
  CODE_THEME_ID,
  MARKDOWN_THEME_ID,
  ENTER_DELAY,
  LEAVE_DELAY,
  TEMPLATE_CUSTOM_NUM,
  TEMPLATE_NUM,
  CODE_NUM
} from "../utils/constant";
import { replaceStyle } from "../utils/helper";
import TEMPLATE from "../template/index";

@inject("content")
@inject("navbar")
@observer
class ThemeSelect extends React.Component {
  constructor(props) {
    super(props);
    const templateNum = window.localStorage.getItem(TEMPLATE_NUM);
    const codeNum = window.localStorage.getItem(CODE_NUM);
    // 初始化markdown主题
    const id = TEMPLATE_OPTIONS[templateNum].id;
    const codeId = CODE_OPTIONS[codeNum].id;
    
    replaceStyle(MARKDOWN_THEME_ID, TEMPLATE.style[id]);

    if (this.props.navbar.codeNum !== 0) {
      replaceStyle(CODE_THEME_ID, TEMPLATE.code[codeId]);
    }
  }

  changeTemplate = item => {
    const index = parseInt(item.key);
    const { id } = TEMPLATE_OPTIONS[index];
    this.props.navbar.setTemplateNum(index);

    // 更新style编辑器
    if (id === "custom") {
      this.props.content.setCustomStyle();
      // 切换自定义自动打开css编辑
      this.props.navbar.setStyleEditorOpen(true);
    } else {
      this.props.content.setStyle(TEMPLATE.style[id]);
    }
    replaceStyle(MARKDOWN_THEME_ID, TEMPLATE.style[id]);
  };

  changeCodeTheme = item => {
    const codeNum = parseInt(item.key);
    const { id } = CODE_OPTIONS[codeNum];
    this.props.navbar.setCodeNum(codeNum);

    // 更新style
    if (codeNum !== 0) {
      replaceStyle(CODE_THEME_ID, TEMPLATE.code[id]);
    }
  };

  toggleStyleEditor = checked => {
    this.props.navbar.setStyleEditorOpen(checked);
  };

  render() {
    const mdMenu = (
      <Menu onClick={this.changeTemplate}>
        {TEMPLATE_OPTIONS.map((option, index) => (
          <Menu.Item key={index}>{option.name}</Menu.Item>
        ))}
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
    const { templateNum, codeNum } = this.props.navbar;
    const mdMenuStyle =
      templateNum === TEMPLATE_CUSTOM_NUM ? style.mdCutomMenu : style.mdMenu;

    return (
      <div>
        <Dropdown overlay={mdMenu} placement="bottomCenter">
          <Button style={mdMenuStyle}>
            {TEMPLATE_OPTIONS[templateNum].name}
            <Icon type="down" />
          </Button>
        </Dropdown>
        <Dropdown overlay={codeMenu} placement="bottomCenter">
          <Button style={style.codeMenu}>
            {CODE_OPTIONS[codeNum].name}
            <Icon type="down" />
          </Button>
        </Dropdown>
        <Tooltip
          placement="bottom"
          mouseEnterDelay={ENTER_DELAY}
          mouseLeaveDelay={LEAVE_DELAY}
          title="样式编辑"
        >
          <Switch
            checked={this.props.navbar.isStyleEditorOpen}
            size="small"
            onChange={this.toggleStyleEditor}
            style={{ marginRight: 8 }}
          />
        </Tooltip>
      </div>
    );
  }
}

const style = {
  mdCutomMenu: {
    marginLeft: 8,
    border: "1px dashed #1890ff"
  },
  mdMenu: {
    marginLeft: 8
  },
  codeMenu: {
    marginLeft: 8,
    marginRight: 8
  }
};

export default ThemeSelect;
