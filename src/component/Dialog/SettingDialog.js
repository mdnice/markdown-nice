import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Modal, Switch, Button } from "antd";

import { IS_PASTE_CHECK_OPEN } from "../../utils/constant";

@inject("dialog")
@inject("navbar")
@observer
class LinkDialog extends Component {
  handleOk = e => {
    this.props.dialog.setSettingOpen(false);
  };

  handleCancel = e => {
    this.props.dialog.setSettingOpen(false);
  };

  toggleAutoFoot = checked => {
    this.props.navbar.setAutoFootOpen(checked);
    localStorage.setItem(IS_PASTE_CHECK_OPEN, checked);
  };

  render() {
    return (
      <Modal
        title="其他设置"
        visible={this.props.dialog.isSettingOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={this.handleOk}>
            确认
          </Button>
        ]}
      >
        <span>粘贴时语法检测：</span>
        <Switch
          checked={this.props.navbar.isPasteCheckOpen}
          size="small"
          onChange={this.toggleAutoFoot}
          style={{ marginRight: 8 }}
        />
      </Modal>
    );
  }
}

export default LinkDialog;
