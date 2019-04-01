import React from "react";
import { Button, Icon, Menu, Dropdown, Switch, Tooltip } from "antd";
import { observer, inject } from "mobx-react";

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
      codeName: "微信代码主题"
    };
    // 初始化markdown主题
    replaceStyle(MARKDOWN_THEME_ID, THEMES.markdown["normal"]);
    // replaceStyle(CODE_THEME_ID, THEMES.code["github"]);
  }

  changeMarkdownTheme = item => {
    const index = item.key;
    const { id, name } = MARKDOWN_OPTIONS[index];
    this.props.navbar.setMarkdownName(name);
    this.props.navbar.setMarkdownId(id);

    // 更新style编辑器
    replaceStyle(MARKDOWN_THEME_ID, THEMES.markdown[id]);
    if (id === "custom") {
      this.props.content.setCustomStyle();
      // this.props.content.setContent(THEMES.content['custom']);

      // 自定义主题则自动打开样式编辑
      this.props.navbar.setStyleEditorOpen(true);
    } else {
      this.props.content.setStyle(THEMES.markdown[id]);
      // this.props.content.setContent(THEMES.content[id]);
    }
  };

  changeCodeTheme = item => {
    const index = item.key;
    const { id, name } = CODE_OPTIONS[index];

    this.setState({ codeName: name });
    if (id === "wechat") {
      this.props.navbar.setWechatCode(true);
    } else {
      this.props.navbar.setWechatCode(false);
      // 更新style
      replaceStyle(CODE_THEME_ID, THEMES.code[id]);
    }
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
        <Dropdown overlay={mdMenu} placement="bottomCenter">
          <Button style={{ marginLeft: 8 }}>
            {this.props.navbar.markdownName}
            <Icon type="down" />
          </Button>
        </Dropdown>
        <Dropdown overlay={codeMenu} placement="bottomCenter">
          <Button style={{ marginLeft: 8, marginRight: 8 }}>
            {this.state.codeName}
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

export default ThemeSelect;
