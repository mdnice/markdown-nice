import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {message} from "antd";

import "../common.css";

@inject("navbar")
@inject("content")
@observer
class Format extends Component {
  handleFormat = () => {
    let {content} = this.props.content;
    content = this.handleWechatOuterLink(content);
    content = content.replace(/([\u4e00-\u9fa5])\$/g, "$1 $");
    content = content.replace(/\$([\u4e00-\u9fa5])/g, "$ $1");
    this.props.content.setContent(content);
    message.success("格式化完成！");
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

  render() {
    return (
      <div className="nice-menu-item" onClick={this.handleFormat}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">微信外链转脚注</span>
        </span>
        {/* <span className="nice-menu-shortcut">⌘⌥I</span> */}
      </div>
    );
  }
}

export default Format;
