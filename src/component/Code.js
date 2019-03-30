import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Button, Icon, Tooltip } from "antd";
import codeIcon from "../icon/code.svg";

import { ENTER_DELAY, LEAVE_DELAY } from "../utils/constant";

@inject("content")
@observer
class Code extends Component {

  handleClick = () => {

  }

  render() {
    return (
      <Tooltip
        placement="bottom"
        mouseEnterDelay={ENTER_DELAY}
        mouseLeaveDelay={LEAVE_DELAY}
        title="代码段"
      >
        <Button onClick={this.handleClick} style={style.btnPadding}>
          <Icon component={codeIcon} style={style.iconSize}/>
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

export default Code;
