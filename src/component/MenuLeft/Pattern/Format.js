import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {message} from "antd";
import prettier from "prettier/standalone";
import prettierMarkdown from "prettier/parser-markdown";

import "../common.css";

@inject("navbar")
@inject("content")
@observer
class Format extends Component {
  handleFormat = () => {
    let {content} = this.props.content;
    content = this.handlePrettierDoc(content);
    content = content.replace(/([\u4e00-\u9fa5])\$/g, "$1 $");
    content = content.replace(/\$([\u4e00-\u9fa5])/g, "$ $1");
    this.props.content.setContent(content);
    message.success("格式化文档完成！");
  };

  handlePrettierDoc = (content) => {
    const prettierRes = prettier.format(content, {
      parser: "markdown",
      plugins: [prettierMarkdown],
    });
    return prettierRes;
  };

  render() {
    return (
      <div className="nice-menu-item" onClick={this.handleFormat}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">格式化文档</span>
        </span>
        {/* <span className="nice-menu-shortcut">⌘⌥I</span> */}
      </div>
    );
  }
}

export default Format;
