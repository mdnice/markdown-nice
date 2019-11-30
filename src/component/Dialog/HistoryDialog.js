import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal} from "antd";

@inject("dialog")
@observer
class HistoryDialog extends Component {
  closeDialog = () => {
    this.props.dialog.setHistoryOpen(false);
  };

  render() {
    return (
      <Modal
        title="本地历史"
        okText="确认"
        cancelText="取消"
        visible={this.props.dialog.isHistoryOpen}
        onOk={this.closeDialog}
        onCancel={this.closeDialog}
      >
      </Modal>
    );
  }
}

export default HistoryDialog;
