import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal} from "antd";

import SyncScroll from "../Setting/SyncScroll";

@inject("dialog")
@observer
class SettingDialog extends Component {
  closeDialog = () => {
    this.props.dialog.setSettingOpen(false);
  };

  render() {
    return (
      <Modal
        title="设置"
        okText="确认"
        cancelText="取消"
        visible={this.props.dialog.isSettingOpen}
        onOk={this.closeDialog}
        onCancel={this.closeDialog}
      >
        <SyncScroll />
      </Modal>
    );
  }
}

export default SettingDialog;
