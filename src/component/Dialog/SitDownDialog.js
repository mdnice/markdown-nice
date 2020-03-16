import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal, Input, Select, message} from "antd";

import SitDownConverter from "../../utils/sitdownConverter";
import {SITDOWN_OPTIONS} from "../../utils/constant";

const {Option} = Select;
const {TextArea} = Input;

@inject("dialog")
@inject("content")
@observer
class SitDownDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: "wechat",
      sourceCode: "",
    };
  }

  handleOk = () => {
    try {
      const {platform, sourceCode} = this.state;

      const domParser = new DOMParser();
      const sourceCodeDom = domParser.parseFromString(sourceCode, "text/html");

      let content = "";

      if (platform === "csdn") {
        const articleDom = sourceCodeDom.getElementById("content_views");
        content = SitDownConverter.CSDN(articleDom);
      } else if (platform === "juejin") {
        const articleDom = sourceCodeDom.getElementsByClassName("article-content");
        content = SitDownConverter.Juejin(articleDom[0]);
      } else if (platform === "zhihu") {
        const articleDom = sourceCodeDom.getElementsByClassName("Post-RichText");
        content = SitDownConverter.Zhihu(articleDom[0]);
      } else if (platform === "wechat") {
        const articleDom = sourceCodeDom.getElementById("js_content");
        content = SitDownConverter.Wechat(articleDom);
      } else {
        content = SitDownConverter.GFM(sourceCodeDom);
      }

      this.props.content.setContent(content);

      this.props.dialog.setSitDownOpen(false);

      const {markdownEditor} = this.props.content;
      // const cursor = markdownEditor.getCursor();
      // cursor.ch += 1;
      // markdownEditor.setCursor(cursor);
      markdownEditor.focus();
    } catch (e) {
      message.error("源代码与已选平台的文章域名不符");
    }
  };

  handleCancel = () => {
    this.props.dialog.setSitDownOpen(false);
  };

  handlePlatform = (value) => {
    this.setState({platform: value});
  };

  handleSourceCode = (e) => {
    this.setState({sourceCode: e.target.value});
  };

  render() {
    const {sourceCode, platform} = this.state;
    return (
      <Modal
        title="SitDown：html 转 markdown 神器"
        okText="转换"
        cancelText="取消"
        visible={this.props.dialog.isSitDownOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Select value={platform} style={{width: 300, marginBottom: "20px"}} onChange={this.handlePlatform}>
          {SITDOWN_OPTIONS.map((option) => (
            <Option key={option.key} value={option.key}>
              {option.value}
            </Option>
          ))}
        </Select>

        <TextArea
          rows={4}
          style={{marginBottom: "5px"}}
          value={sourceCode}
          onChange={this.handleSourceCode}
          placeholder="请放入网页源代码"
        />
        <span>提示：右键-&gt;显示网页源代码-&gt;全选-&gt;复制粘贴。</span>
        <a
          id="nice-sitdown-dialog-doc"
          rel="noopener noreferrer"
          target="_blank"
          href="https://docs.mdnice.com/#/sitdown"
        >
          详细文档
        </a>
      </Modal>
    );
  }
}

export default SitDownDialog;
