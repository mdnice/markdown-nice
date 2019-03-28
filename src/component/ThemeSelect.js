import React from "react";
import themeIcon from "../icon/theme.svg";
import codeIcon from "../icon/code.svg";
import { Button, Icon, Menu, Dropdown } from "antd";
import { THEMES_OPTIONS, CODE_OPTIONS } from "../utils/constant";

class ThemeSelect extends React.Component {
  state = {
    themeValue: "normal",
    themeName: "橙色主题",
    codeTheme: "ascetic"
  };

  changeTheme = item => {
    let index = item.key;
    this.selectTheme(THEMES_OPTIONS[index].value);
    this.setState({ themeName: THEMES_OPTIONS[index].name });
  };

  selectTheme = value => {
    this.setState({ themeValue: value });
    let el = document.getElementById("markdown-theme");
    el.href = `./themes/${value}.css`;
  };

  changeCodeTheme = ({ key }) => {
    console.log(key);
    this.setState({ codeTheme: key });
    let el = document.getElementById("code-theme");
    el.href = `./code/${key}.css`;
  };

  render() {
    const mdMenu = (
      <Menu onClick={this.changeTheme}>
        {THEMES_OPTIONS.map((option, index) => (
          <Menu.Item key={index}>{option.name}</Menu.Item>
        ))}
      </Menu>
    );
    const codeMenu = (
      <Menu onClick={this.changeCodeTheme}>
        {CODE_OPTIONS.map(option => (
          <Menu.Item key={option}>{option}</Menu.Item>
        ))}
      </Menu>
    );

    return (
      <div>
        <Dropdown overlay={mdMenu}>
          <Button style={{ marginLeft: 8 }}>
            {this.state.themeName}
            <Icon component={themeIcon} style={{ fontSize: "18px" }} />
          </Button>
        </Dropdown>
        <Dropdown overlay={codeMenu}>
          <Button style={{ marginLeft: 8 }}>
            代码主题
            <Icon component={codeIcon} style={{ fontSize: "18px" }} />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default ThemeSelect;
