import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal, Switch, Button} from "antd";

import {IS_PASTE_CHECK_OPEN, IS_PRETTIER_OPEN} from "../../utils/constant";

@inject("dialog")
@inject("navbar")
@observer
class LinkDialog extends Component {
  handleOk = () => {
    this.props.dialog.setSettingOpen(false);
  };

  handleCancel = () => {
    this.props.dialog.setSettingOpen(false);
  };

  toggleAutoFoot = (checked) => {
    this.props.navbar.setAutoFootOpen(checked);
    localStorage.setItem(IS_PASTE_CHECK_OPEN, checked);
  };

  togglePrettier = (checked) => {
    this.props.navbar.setPrettierOpen(checked);
    localStorage.setItem(IS_PRETTIER_OPEN, checked);
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
          </Button>,
        ]}
      >
        <div>
          <span style={style.marginWord}>粘贴时语法检测：</span>
          <Switch checked={this.props.navbar.isPasteCheckOpen} size="small" onChange={this.toggleAutoFoot} />
        </div>
        <div style={style.marginParagraph}>
          <span style={style.marginWord}>复制时排版检测：</span>
          <Switch checked={this.props.navbar.isPrettierOpen} size="small" onChange={this.togglePrettier} />
        </div>
      </Modal>
    );
  }
}

const style = {
  marginWord: {
    marginRight: "8px",
  },
  marginParagraph: {
    marginTop: "8px",
  },
};

export default LinkDialog;
