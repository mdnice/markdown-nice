import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Menu, Dropdown, Switch, Icon, message} from "antd";

import prettier from "prettier/standalone";
import prettierMarkdown from "prettier/parser-markdown";

import {IS_PASTE_CHECK_OPEN, IS_PRETTIER_OPEN} from "../../utils/constant";
import "./Format.css";

@inject("navbar")
@inject("content")
@observer
class Format extends Component {
  handleFormat = () => {
    let {content} = this.props.content;
    if (this.props.navbar.isPasteCheckOpen) {
      content = this.handleWechatOuterLink(content);
    }
    if (this.props.navbar.isPrettierOpen) {
      content = this.handlePrettierDoc(content);
    }
    this.props.content.setContent(content);
    message.success("格式化完成！");
  };

  handlePrettierDoc = (content) => {
    const prettierRes = prettier.format(content, {
      parser: "markdown",
      plugins: [prettierMarkdown],
    });
    return prettierRes;
  };

  handleWechatOuterLink = (content) => {
    const linkImgReg = /(!)*\[.*?\]\(((?!mp.weixin.qq.com).)*?\)/g;
    const res = content.match(linkImgReg); // 匹配到图片、链接和脚注

    if (res === null) {
      return content;
    }

    const footReg = /.*?\(.*?"(.*?)".*?\)/;
    const filterRes = res.filter((val) => {
      const comment = val.match(footReg);
      if (val[0] === "!") {
        return false;
      }
      if (comment && comment[1] !== "") {
        return false;
      }
      return true;
    }); // 过滤掉图片和脚注

    if (filterRes.length > 0) {
      filterRes.forEach((val) => {
        const linkReg = /\[(.*?)\]\((.*?)\)/; // 匹配链接中具体的值
        const matchValue = val.match(linkReg);
        const name = matchValue[1];
        const url = matchValue[2].trim();

        const newVal = `[${name}](${url} "${name}")`;
        content = content.replace(val, newVal);
      });
      return content;
    } else {
      return content;
    }
  };

  toggleAutoFoot = (checked) => {
    this.props.navbar.setAutoFootOpen(checked);
    localStorage.setItem(IS_PASTE_CHECK_OPEN, checked);
  };

  togglePrettier = (checked) => {
    this.props.navbar.setPrettierOpen(checked);
    localStorage.setItem(IS_PRETTIER_OPEN, checked);
  };

  render() {
    const menu = (
      <Menu>
        <div className="nice-btn-format-menu-item">
          <div className="nice-btn-format-list-item">
            <span className="nice-btn-format-list-item-name">微信外链转脚注</span>

            <span className="nice-btn-format-list-item-switch">
              <Switch checked={this.props.navbar.isPasteCheckOpen} size="small" onChange={this.toggleAutoFoot} />
            </span>
          </div>
        </div>
        <div className="nice-btn-format-menu-item">
          <div className="nice-btn-format-list-item">
            <span className="nice-btn-format-list-item-name">排版（中英文空格等）</span>

            <span className="nice-btn-format-list-item-switch">
              <Switch checked={this.props.navbar.isPrettierOpen} size="small" onChange={this.togglePrettier} />
            </span>
          </div>
        </div>
      </Menu>
    );
    return (
      <Dropdown.Button
        onClick={this.handleFormat}
        overlay={menu}
        icon={<Icon type="more" />}
        className="nice-btn-format"
      >
        格式化
      </Dropdown.Button>
    );
  }
}

export default Format;
