import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Button, Icon, Tooltip } from "antd";
import delIcon from "../icon/del.svg";

import { ENTER_DELAY, LEAVE_DELAY } from "../utils/constant";

@inject("content")
@observer
class Del extends Component {

  handleClick = () => {
    const { markdownEditor } = this.props.content;
    const cursor = markdownEditor.getCursor();
    const selection = markdownEditor.getSelection();
    const text = `~~${selection}~~`
    markdownEditor.replaceSelection(text, cursor);
  }

  render() {
    return (
      <Tooltip
        placement="bottom"
        mouseEnterDelay={ENTER_DELAY}
        mouseLeaveDelay={LEAVE_DELAY}
        title="删除线"
      >
        <Button onClick={this.handleClick} style={style.btnPadding}>
          <Icon component={delIcon} style={style.iconSize}/>
        </Button>
      </Tooltip>
      
    );
  }
}

const style = {
  btnPadding: {
    padding: "0 8px"
  },
  iconSize: {
    fontSize: "18px"
  }
};

export default Del;
