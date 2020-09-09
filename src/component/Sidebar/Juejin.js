import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {message, Tooltip} from "antd";

import {solveHtml, solveJuejinMath, solveJuejinCode, addJuejinSuffix, copySafari} from "../../utils/converter";
import {LAYOUT_ID, ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";
import SvgIcon from "../../icon";
import "./Juejin.css";

@inject("content")
@inject("navbar")
@inject("imageHosting")
@inject("dialog")
@observer
class Juejin extends Component {
  constructor(props) {
    super(props);
    this.html = "";
  }

  copyJuejin = () => {
    const layout = document.getElementById(LAYOUT_ID); // 保护现场
    const html = layout.innerHTML;
    solveJuejinMath();
    addJuejinSuffix();
    this.html = solveHtml();
    this.html = solveJuejinCode(this.html);
    copySafari(this.html);
    if (this.html.length > 60000) {
      message.error("超过 60000 字符，无法上传稀土掘金");
    } else {
      message.success("已复制且添加 mdnice 排版后缀，感谢宣传，请到稀土掘金粘贴");
    }
    layout.innerHTML = html; // 恢复现场
  };

  render() {
    return (
      <Tooltip placement="left" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="复制到稀土掘金">
        <a id="nice-sidebar-juejin" className="nice-btn-juejin" onClick={this.copyJuejin}>
          <SvgIcon name="juejin" className="nice-btn-juejin-icon" />
        </a>
      </Tooltip>
    );
  }
}

export default Juejin;
