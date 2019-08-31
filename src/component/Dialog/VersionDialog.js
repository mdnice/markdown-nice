import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Modal, Timeline, Button } from "antd";
import { VERSION_TIMELINE } from "../../utils/constant";

@inject("dialog")
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
    w.location.href = "https://github.com/zhning12/markdown-nice/blob/master/CHANGELOG.md";
  };

  render() {
    return (
      <Modal
        title="版本更新"
        visible={this.props.dialog.isVersionOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="more" onClick={this.handleMore}>更多</Button>,
          <Button key="submit" type="primary" onClick={this.handleOk}>
            确认
          </Button>
        ]}
      >
        <Timeline>
          {VERSION_TIMELINE.map((version, index) => {
            if (index === 0) {
              return (
                <Timeline.Item key={index}>
                  <strong>{version}</strong>
                </Timeline.Item>
              );
            } else {
              return <Timeline.Item key={index}>{version}</Timeline.Item>;
            }
          })}
        </Timeline>
      </Modal>
    );
  }
}

export default LinkDialog;
