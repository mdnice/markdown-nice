import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Button, Icon, Tooltip } from "antd";
import boldIcon from "../icon/bold.svg";

import { ENTER_DELAY, LEAVE_DELAY } from "../utils/constant";

@inject("content")
@observer
class Bold extends Component {

  handleClick = () => {

  }

  render() {
    return (
      <Tooltip
        placement="bottom"
        mouseEnterDelay={ENTER_DELAY}
        mouseLeaveDelay={LEAVE_DELAY}
        title="加粗"
      >
        <Button onClick={this.handleClick} style={style.btnPadding}>
          <Icon component={boldIcon} style={style.iconSize}/>
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

export default Bold;
