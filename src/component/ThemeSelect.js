import React from 'react';
import themeIcon from '../icon/theme.svg';
import codeIcon from '../icon/code.svg'
import { Button, Icon, Menu, Dropdown, } from 'antd';
import 'antd/dist/antd.css';

const options = [
  {
    value: "normal",
    name: "默认样式"
  },
  {
    value: "title1b",
    name: "标题首字突出"
  },
  {
    value: "titleDaogua",
    name: "标题倒挂"
  },
  {
    value: "bgGrid",
    name: "网格背景"
  },
  {
    value: "titleLower",
    name: "标题下边框"
  },
  {
    value: "titleLH",
    name: "标题上下边框"
  },
  {
    value: "title4",
    name: "标题四边框"
  },
  {
    value: "titleBg",
    name: "标题背景"
  },
  {
    value: "titleBgChange",
    name: "标题背景渐变"
  },
  {
    value: "titlecolor",
    name: "标题颜色"
  },
  {
    value: "titleHandsome",
    name: "标题酷酷"
  },
  {
    value: "totalExample",
    name: "综合示例"
  },
]
const codeOptions = ['railscasts', 'dark', 'darkula', 'github', 'github-gist', 'gml', 'hybird', 'idea', 'rainbow', 'tomorrow', 'vs', 'vs2015', 'xcode', 'xt256', 'zenburn'];

class ThemeSelect extends React.Component {
  state = {
    themeValue: 'normal',
    themeName: '默认样式',
    codeTheme: 'ascetic'
  };

  changeTheme = (item) => {
    let index = item.key;
    this.selectTheme(options[index].value);
    this.setState({ themeName: options[index].name });
  }

  selectTheme = (value) => {
    this.setState({ themeValue: value });
    let el = document.getElementById('markdown-theme');
    el.href = `./markdown-css/${value}.css`;
  }

  changeCodeTheme = ({ key }) => {
    console.log(key);
    this.setState({ codeTheme: key });
    let el = document.getElementById('code-theme');
    el.href = `./code-styles/${key}.css`;
  }

  render() {
    const mdMenu = (
      <Menu onClick={this.changeTheme}>
        {options.map((option, index) => (
          <Menu.Item key={index}  > <Icon type="user" /> {option.name}</Menu.Item>
        ))}
      </Menu>
    );
    const codeMenu = (
      <Menu onClick={this.changeCodeTheme}>
        {codeOptions.map((option) => (
          <Menu.Item key={option}> <Icon type="user" /> {option}</Menu.Item>
        ))}
      </Menu>
    );

    return (
      <div>
        <Dropdown overlay={mdMenu}>
          <Button style={{ marginLeft: 8 }}>
            {this.state.themeName}
            <Icon component={themeIcon} style={{ fontSize: "18px" }}></Icon>
          </Button>
        </Dropdown>
        <Dropdown overlay={codeMenu}>
          <Button style={{ marginLeft: 8 }}>
            代码主题
            <Icon component={codeIcon} style={{ fontSize: "18px" }}></Icon>
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default ThemeSelect;