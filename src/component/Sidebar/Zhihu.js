import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {message, Tooltip} from "antd";

import {solveHtml, solveZhihuMath, copySafari} from "../../utils/converter";
import {LAYOUT_ID, CODE_NUM, ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";
import SvgIcon from "../../icon";
import "./Zhihu.css";

@inject("content")
@inject("navbar")
@inject("imageHosting")
@inject("dialog")
@observer
class Zhihu extends Component {
  constructor(props) {
    super(props);
    this.html = "";
  }

  copyZhihu = () => {
    if (window.localStorage.getItem(CODE_NUM) === "0") {
      message.warning("您当前使用的是微信代码主题，请切换其他代码主题后再试！");
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
    return (
      <Tooltip placement="left" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="复制到知乎">
        <a id="nice-sidebar-zhihu" className="nice-btn-zhihu" onClick={this.copyZhihu}>
          <SvgIcon name="zhihu" className="nice-btn-zhihu-icon" />
        </a>
      </Tooltip>
    );
  }
}

export default Zhihu;
