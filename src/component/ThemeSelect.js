import React from 'react';
import NavIcon from './NavIcon'
import themeIcon from '../icon/theme.svg';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

const ITEM_HEIGHT = 48;

class ThemeSelect extends React.Component {
  state = {
    anchorEl: null,
    themeValue:'normal'
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (value, event) => {
    this.setState({ anchorEl: null });
    event.persist();
    this.selectTheme(value);
  };

  selectTheme = (value) => {
    this.setState({ themeValue: value });
    var el = document.getElementById('markdown-theme');
    el.href = `./markdown-css/${value}.css`;
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <NavIcon title="change the theme" onClick={this.handleClick} src={themeIcon} alt="change the theme"></NavIcon>
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 200,
              },
            }}
          >
            {options.map(option => (
              <MenuItem key={option.value} selected={option.value === 'normal'} onClick={(e) => this.handleClose(option.value, e)} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Menu>
      </div>
    );
  }
}

export default ThemeSelect;