import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Modal, Input, Form } from "antd";

@inject("dialog")
@inject("content")
@observer
class LinkDialog extends Component {
  handleOk = e => {
    this.props.dialog.setLinkOpen(false);
  };

  handleCancel = e => {
    this.props.dialog.setLinkOpen(false);
  };

  render() {
    return (
      <Modal
        title="添加链接"
        okText="确认"
        cancelText="取消"
        visible={this.props.dialog.isLinkOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form.Item label="链接地址">
          <Input placeholder="请输入链接地址" />
        </Form.Item>
      </Modal>
    );
  }
}

export default LinkDialog;
