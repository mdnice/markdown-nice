import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {message, ConfigProvider, Dropdown, Icon, Menu} from "antd";

import {solveWeChatMath, solveZhihuMath, solveHtml, copySafari} from "../utils/converter";
import {LAYOUT_ID} from "../utils/constant";
import "./Copy.css";

@inject("content")
@inject("navbar")
@inject("imageHosting")
@inject("dialog")
@observer
class Copy extends Component {
  constructor(props) {
    super(props);
    this.html = "";
  }

  copyWechat = () => {
    const layout = document.getElementById(LAYOUT_ID); // 保护现场
    const html = layout.innerHTML;
    solveWeChatMath();
    this.html = solveHtml();
    copySafari(this.html);
    message.success("已复制，请到微信公众平台粘贴");
    layout.innerHTML = html; // 恢复现场
  };

  copyZhihu = () => {
    const layout = document.getElementById(LAYOUT_ID); // 保护现场
    const html = layout.innerHTML;
    solveZhihuMath();
    this.html = solveHtml();
    copySafari(this.html);
    message.success("已复制，请到知乎粘贴");
    layout.innerHTML = html; // 恢复现场
  };

  render() {
    const menu = (
      <Menu>
        <div style={style.menuItem}>
          <div role="button" style={style.themeItem} onClick={this.copyZhihu} onKeyDown={this.copyZhihu} tabIndex="0">
            复制到知乎
          </div>
        </div>
      </Menu>
    );
    return (
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Dropdown.Button
          onClick={this.copyWechat}
          overlay={menu}
          icon={<Icon type="more" style={style.iconSize} />}
          className="nice-copy"
          type="primary"
        >
          复制
        </Dropdown.Button>
      </ConfigProvider>
    );
  }
}

const style = {
  btnHeight: {
    height: "30px",
  },
  mathNotify: {
    padding: 0,
    fontSize: "14px",
    lineHeight: "20px",
    color: "rgba(0,0,0,0.65)",
  },
  close: {
    padding: 0,
  },
  format: {
    marginRight: 8,
  },
  themeItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  themeItemAuthor: {
    color: "gray",
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

export default Copy;
