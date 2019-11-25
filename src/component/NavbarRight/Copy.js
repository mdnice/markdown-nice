import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {message, ConfigProvider, Dropdown, Icon, Menu} from "antd";

import {solveWeChatMath, solveZhihuMath, solveHtml, copySafari} from "../../utils/converter";
import {LAYOUT_ID, CODE_NUM} from "../../utils/constant";
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
    if (window.localStorage.getItem(CODE_NUM) === "0") {
      message.warning("您当前使用的是微信主题，请切换其他主题后再试哦");
      return;
    }
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
        <div className="nice-btn-copy-menu-item">
          <div
            role="button"
            className="nice-btn-copy-theme-item"
            onClick={this.copyZhihu}
            onKeyDown={this.copyZhihu}
            tabIndex="0"
          >
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
          icon={<Icon type="more" />}
          className="nice-btn-copy"
          type="primary"
        >
          复制
        </Dropdown.Button>
      </ConfigProvider>
    );
  }
}

export default Copy;
