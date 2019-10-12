import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Tooltip} from "antd";
// import italicIcon from "../icon/italic.svg";

import {ENTER_DELAY, LEAVE_DELAY} from "../utils/constant";
import SvgIcon from "../icon";

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
          <SvgIcon name="italic" style={style.svgIcon} />
        </Button>
      </Tooltip>
    );
  }
}

const style = {
  btnPadding: {
    padding: "0",
  },
  svgIcon: {
    padding: "6px 7px 10px 7px",
    width: "33px",
    height: "33px",
  },
};

export default Italic;
