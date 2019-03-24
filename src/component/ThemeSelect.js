import React from 'react';
import themeIcon from '../icon/theme.svg';
import { Button, Icon, Menu, Dropdown, } from 'antd';
import 'antd/dist/antd.css';

const options = [
  {
    value: "normal",
    name: "默认样式"
  },
  {
    value: "test",
    name: "标题下边框"
  },
  {
    value: "titleBackground",
    name: "标题背景"
  },
  {
    value: "titlecolor",
    name: "标题颜色"
  },
  {
    value: "titleHandsome",
    name: "标题酷酷"
  },
]

class ThemeSelect extends React.Component {
  state = {
    themeValue: 'normal',
    themeName: '默认样式'
  };

  changeTheme = (item) => {
    let index = item.key;
    this.selectTheme(options[index].value);
    this.setState({ themeName: options[index].name });
  }

  selectTheme = (value) => {
    this.setState({ themeValue: value });
    var el = document.getElementById('markdown-theme');
    el.href = `./markdown-css/${value}.css`;
  }

  render() {
    const menu = (
      <Menu onClick={this.changeTheme}>
        {options.map((option, index) => (
          <Menu.Item key={index}  > <Icon type="user" /> {option.name}</Menu.Item>
        ))}
      </Menu>
    );

    return (
      <div>
        <Dropdown overlay={menu}>
          <Button style={{ marginLeft: 8 }}>
            {this.state.themeName}
            <Icon component={themeIcon} style={{ fontSize: "18px" }}></Icon>
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default ThemeSelect;