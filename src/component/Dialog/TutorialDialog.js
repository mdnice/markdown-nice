import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal, Button, message} from "antd";

@inject("dialog")
@observer
class TutorialDialog extends Component {
  handleOk = () => {
    this.props.dialog.setTutorialOpen(false);
    const {tutorialContent} = this.props.dialog;
    // 复制触发
    document.addEventListener("copy", function copyCall(e) {
      e.preventDefault();
      e.clipboardData.setData("text/html", tutorialContent);
      e.clipboardData.setData("text/plain", tutorialContent);
      document.removeEventListener("copy", copyCall);
    });
    document.execCommand("copy");
    message.success("拷贝成功，请在左侧编辑器粘贴");
  };

  handleCancel = () => {
    this.props.dialog.setTutorialOpen(false);
  };

  render() {
    return (
      <Modal
        title={this.props.dialog.tutorialTitle}
        okText="确认"
        cancelText="取消"
        visible={this.props.dialog.isTutorialOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={this.handleOk}>
            拷贝 Markdown 并在编辑器中实验
          </Button>,
        ]}
        bodyStyle={{
          paddingTop: "5px",
        }}
      >
        <p style={style.lineHeight}>左侧为 Markdown 可编辑文本，右侧为渲染效果</p>
        <div style={{display: "flex", alignItems: "center"}}>
          <img alt="图片描述" style={style.imgWidth} src={this.props.dialog.tutorialPicture} />
        </div>
      </Modal>
    );
  }
}

const style = {
  imgWidth: {
    width: "100%",
    height: "100%",
  },
  lineHeight: {
    lineHeight: "40px",
    color: "black",
    padding: 0,
    marginBottom: 10,
  },
};

export default TutorialDialog;
