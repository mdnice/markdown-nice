import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Modal, Timeline, Button } from "antd";
import { VERSION_TIMELINE } from "../../utils/constant";

@inject("dialog")
@inject("content")
@observer
class LinkDialog extends Component {
  handleOk = e => {
    this.props.dialog.setVersionOpen(false);
  };

  handleCancel = e => {
    this.props.dialog.setVersionOpen(false);
  };

  handleMore = e => {
    const w = window.open("about:blank");
    w.location.href = "https://github.com/zhning12/markdown-nice";
  };

  render() {
    return (
      <Modal
        title="版本更新"
        visible={this.props.dialog.isVersionOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button onClick={this.handleMore}>更多</Button>,
          <Button type="primary" onClick={this.handleOk}>
            确认
          </Button>
        ]}
      >
        <Timeline>
          {VERSION_TIMELINE.map((version, index) => {
            if (index === 0) {
              return (
                <Timeline.Item>
                  <strong>{version}</strong>
                </Timeline.Item>
              );
            } else {
              return <Timeline.Item>{version}</Timeline.Item>;
            }
          })}
        </Timeline>
      </Modal>
    );
  }
}

export default LinkDialog;
