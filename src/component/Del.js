import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Tooltip} from "antd";

import {ENTER_DELAY, LEAVE_DELAY} from "../utils/constant";
import SvgIcon from "../icon";

@inject("content")
@observer
class Del extends Component {
  handleClick = () => {
    const {markdownEditor} = this.props.content;
    const cursor = markdownEditor.getCursor();
    const selection = markdownEditor.getSelection();
    const text = `~~${selection}~~`;
    markdownEditor.replaceSelection(text, cursor);

    // 上传后实时更新内容
    const content = markdownEditor.getValue();
    this.props.content.setContent(content);
  };

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="删除线">
        <Button onClick={this.handleClick} style={style.btnPadding}>
          <SvgIcon name="del" style={style.svgIcon} />
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
    padding: "7px 7px 9px 7px",
    width: "33px",
    height: "33px",
  },
};

export default Del;
