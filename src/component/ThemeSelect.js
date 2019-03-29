import React from "react";
import { Button, Icon, Menu, Dropdown, Switch, Tooltip } from "antd";
import { observer, inject } from "mobx-react";

import themeIcon from "../icon/theme.svg";
import codeIcon from "../icon/code.svg";

import {
  MARKDOWN_OPTIONS,
  CODE_OPTIONS,
  CODE_THEME_ID,
  MARKDOWN_THEME_ID,
  ENTER_DELAY,
  LEAVE_DELAY
} from "../utils/constant";
import { replaceStyle } from "../utils/helper";
import THEMES from "../theme/index";

@inject("content")
@inject("navbar")
@observer
class ThemeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeName: "github"
    };
    // 初始化markdown主题和代码主题
    replaceStyle(MARKDOWN_THEME_ID, THEMES.markdown["normal"]);
    replaceStyle(CODE_THEME_ID, THEMES.code["github"]);
  }

  changeMarkdownTheme = item => {
    const index = item.key;
    const { id, name } = MARKDOWN_OPTIONS[index];
    this.props.navbar.setMarkdownName(name);
    this.props.navbar.setMarkdownId(id);

    console.log(id)
    // 更新style编辑器
    replaceStyle(MARKDOWN_THEME_ID, THEMES.markdown[id]);
    if (id === "custom") {
      this.props.content.setCustomStyle();
    } else {
      this.props.content.setStyle(THEMES.markdown[id]);
    }
  };

  changeCodeTheme = item => {
    const index = item.key;
    const { id, name } = CODE_OPTIONS[index];
    this.setState({ codeName: name });

    // 更新style
    replaceStyle(CODE_THEME_ID, THEMES.code[id]);
  };

  toggleStyleEditor = checked => {
    this.props.navbar.setStyleEditorOpen(checked);
  };

  render() {
    const mdMenu = (
      <Menu onClick={this.changeMarkdownTheme}>
        {MARKDOWN_OPTIONS.map((option, index) => (
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

    return (
      <div>
        <Tooltip
          placement="bottom"
          mouseEnterDelay={ENTER_DELAY}
          mouseLeaveDelay={LEAVE_DELAY}
          title="样式编辑器"
        >
          <Switch
            size="small"
            onChange={this.toggleStyleEditor}
            style={{ marginLeft: 8 }}
          />
        </Tooltip>
        <Dropdown overlay={mdMenu}>
          <Button style={{ marginLeft: 8 }}>
            {this.props.navbar.markdownName}
            <Icon component={themeIcon} style={{ fontSize: "18px" }} />
          </Button>
        </Dropdown>
        <Dropdown overlay={codeMenu}>
          <Button style={{ marginLeft: 8, marginRight: 8 }}>
            {this.state.codeName}
            <Icon component={codeIcon} style={{ fontSize: "18px" }} />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default ThemeSelect;
