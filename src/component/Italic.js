import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Icon, Tooltip} from "antd";
import italicIcon from "../icon/italic.svg";

import {ENTER_DELAY, LEAVE_DELAY} from "../utils/constant";

@inject("content")
@observer
class Italic extends Component {
  handleClick = () => {
    const {markdownEditor} = this.props.content;
    const cursor = markdownEditor.getCursor();
    const selection = markdownEditor.getSelection();
    const text = `*${selection}*`;
    markdownEditor.replaceSelection(text, cursor);

    // 上传后实时更新内容
    const content = markdownEditor.getValue();
    this.props.content.setContent(content);
  };

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="斜体">
        <Button onClick={this.handleClick} style={style.btnPadding}>
          <Icon component={italicIcon} style={style.iconSize} />
        </Button>
      </Tooltip>
    );
  }
}

const style = {
  btnPadding: {
    padding: "0 8px",
  },
  iconSize: {
    fontSize: "17px",
  },
};

export default Italic;
