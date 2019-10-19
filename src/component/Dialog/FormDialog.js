import React from "react";
import {observer, inject} from "mobx-react";
import {Modal, Input, Form} from "antd";

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
    return appendText + (/macintosh|mac os x/i.test(navigator.userAgent) ? "\n" : "\r\n");
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

    this.setState(initialState);
    this.props.dialog.setFormOpen(false);
  };

  handleCancel = () => {
    this.setState(initialState);
    this.props.dialog.setFormOpen(false);
  };

  handleChange = (value, target) => {
    this.setState({
      [target]: value,
    });
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
        <div style={style.column}>
          <Form.Item label="行">
            <Input
              placeholder="请输入表格的行数"
              value={this.state.rowNum}
              onChange={(e) => this.handleChange(e.target.value, "rowNum")}
            />
          </Form.Item>
          <Form.Item label="列">
            <Input
              placeholder="请输入表格的列数"
              value={this.state.columnNum}
              onChange={(e) => this.handleChange(e.target.value, "columnNum")}
            />
          </Form.Item>
        </div>
      </Modal>
    );
  }
}

const initialState = {
  columnNum: 0,
  rowNum: 0,
};

const style = {
  column: {
    display: "flex",
    flexDirection: "column",
  },
};

export default FormDialog;
