import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal, Input, Form} from "antd";

@inject("dialog")
@inject("content")
@observer
class LinkDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
    };
  }

  handleOk = () => {
    const {markdownEditor} = this.props.content;
    const cursor = markdownEditor.getCursor();
    const selection = markdownEditor.getSelection();
    const text = `[${selection}](${this.state.link})`;
    markdownEditor.replaceSelection(text, cursor);

    // 上传后实时更新内容
    const content = markdownEditor.getValue();
    this.props.content.setContent(content);

    this.setState({link: ""});
    this.props.dialog.setLinkOpen(false);
    cursor.ch += 1;
    markdownEditor.setCursor(cursor);
    markdownEditor.focus();
  };

  handleCancel = () => {
    this.setState({link: ""});
    this.props.dialog.setLinkOpen(false);
  };

  handleChange = (e) => {
    this.setState({link: e.target.value});
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
          <Input placeholder="请输入链接地址" value={this.state.link} onChange={this.handleChange} />
        </Form.Item>
      </Modal>
    );
  }
}

export default LinkDialog;
