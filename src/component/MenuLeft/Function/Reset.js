import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal, message} from "antd";

import TEMPLATE from "../../../template/index";
import "../common.css";

@inject("content")
@inject("navbar")
@observer
class Reset extends Component {
  showConfirm = () => {
    Modal.confirm({
      title: "确认重置么?",
      content: "重置后将丢失本地保存的文本和自定义样式",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        this.props.content.setContent(TEMPLATE.content);
        this.props.content.setStyle(TEMPLATE.style.normal);
        this.props.content.setCustomStyle(TEMPLATE.style.custom);
        this.props.navbar.setTemplateNum(0);
        message.success("重置成功！");
      },
      onCancel() {},
    });
  };

  render() {
    return (
      <div id="nice-menu-reset" className="nice-menu-item" onClick={this.showConfirm}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">重置</span>
        </span>
      </div>
    );
  }
}

export default Reset;
