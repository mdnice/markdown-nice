import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Tooltip} from "antd";

import {ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";
import SvgIcon from "../../icon";
import "./Bold.css";

@inject("content")
@observer
class Bold extends Component {
  handleClick = () => {
    const {markdownEditor} = this.props.content;
    const cursor = markdownEditor.getCursor();
    const selection = markdownEditor.getSelection();
    const text = `**${selection}**`;
    markdownEditor.replaceSelection(text, cursor);

    // 上传后实时更新内容
    const content = markdownEditor.getValue();
    this.props.content.setContent(content);
  };

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="加粗">
        <Button onClick={this.handleClick} className="nice-btn-bold">
          <SvgIcon name="bold" className="nice-btn-bold-icon" />
        </Button>
      </Tooltip>
    );
  }
}

export default Bold;
