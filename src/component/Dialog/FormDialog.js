import React from "react";
import {observer, inject} from "mobx-react";
import {Modal, InputNumber, Form} from "antd";

@inject("dialog")
@inject("content")
@observer
class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  buildRow = (rowNum, columnNum) => {
    let appendText = "|";
    if (rowNum === 1) {
      appendText += " --- |";
      for (let i = 0; i < columnNum - 1; i++) {
        appendText += " --- |";
      }
    } else {
      appendText += "     |";
      for (let i = 0; i < columnNum - 1; i++) {
        appendText += "     |";
      }
    }
    return appendText + (/windows|win32/i.test(navigator.userAgent) ? "\r\n" : "\n");
  };

  buildFormFormat = (rowNum, columnNum) => {
    let formFormat = "";
    for (let i = 0; i < 3; i++) {
      formFormat += this.buildRow(i, columnNum);
    }
    for (let i = 3; i <= rowNum; i++) {
      formFormat += this.buildRow(i, columnNum);
    }
    return formFormat;
  };

  handleOk = () => {
    const {markdownEditor} = this.props.content;
    const cursor = markdownEditor.getCursor();

    const text = this.buildFormFormat(this.state.rowNum, this.state.columnNum);
    markdownEditor.replaceSelection(text, cursor);

    const content = markdownEditor.getValue();
    this.props.content.setContent(content);

    this.handleCancel();
    cursor.ch += 2;
    markdownEditor.setCursor(cursor);
    markdownEditor.focus();
  };

  handleCancel = () => {
    this.setState(initialState);
    this.props.dialog.setFormOpen(false);
  };

  render() {
    return (
      <Modal
        title="添加表格"
        okText="确认"
        cancelText="取消"
        visible={this.props.dialog.isFormOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form.Item label="行数" labelCol={{span: 4}}>
          <InputNumber
            min={2}
            max={10}
            value={this.state.rowNum}
            defaultValue={1}
            onChange={(value) => this.setState({rowNum: value})}
          />
        </Form.Item>
        <Form.Item label="列数" labelCol={{span: 4}}>
          <InputNumber
            min={1}
            max={10}
            value={this.state.columnNum}
            defaultValue={1}
            onChange={(value) => this.setState({columnNum: value})}
          />
        </Form.Item>
      </Modal>
    );
  }
}

const initialState = {
  columnNum: 1,
  rowNum: 2,
};

export default FormDialog;
