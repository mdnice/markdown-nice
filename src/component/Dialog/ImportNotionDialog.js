import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal, Input, message} from "antd";

import notionToMarkdown from "../../utils/notionConverter";

@inject("dialog")
@inject("content")
@observer
class ImportNotionDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secretKey: "",
      pageId: "",
    };
  }

  handleOk = () => {
    if (this.state.secretKey === "" || this.state.pageId === "") {
      message.error("请输入Secret Key和Notion Page ID");
      return;
    }

    (async () => {
      let content = "";
      const hide = message.loading("转换中，请耐心等待...", 0);
      content = await notionToMarkdown(this.state.secretKey, this.state.pageId);
      hide();
      this.props.dialog.setImportNotionOpen(false);
      console.log(content);
      if (content !== "") {
        message.success("转换成功");
        this.props.content.setContent(content);
        const {markdownEditor} = this.props.content;
        markdownEditor.focus();
      } else {
        message.error("转换失败，请重试~");
      }
    })();
  };

  handleCancel = () => {
    this.props.dialog.setImportNotionOpen(false);
  };

  handleSecretKey = (e) => {
    this.setState({secretKey: e.target.value});
  };

  handlePageId = (e) => {
    this.setState({pageId: e.target.value});
  };

  render() {
    const {secretKey, pageId} = this.state;
    return (
      <>
        <Modal
          title="导入Notion文档：Notion文档转MarkDown"
          okText="导入"
          cancelText="取消"
          visible={this.props.dialog.isImportNotionOpen}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <span>SecretKey: </span>
          <Input.Password
            value={secretKey}
            placeholder="请输入Secret Key"
            style={{margin: "6px 0px"}}
            onChange={this.handleSecretKey}
          />

          <span>Notion Page ID: </span>
          <Input value={pageId} placeholder="Notion文档id" style={{margin: "6px 0px"}} onChange={this.handlePageId} />
          <span>提示：SecretKey和Page ID获取方法参考 </span>
          <a id="nice-sitdown-dialog-doc" rel="noopener noreferrer" target="_blank" href="https://dub.sh/nomo">
            获取Notion密钥和Page ID
          </a>
        </Modal>
      </>
    );
  }
}

export default ImportNotionDialog;
