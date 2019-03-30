import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Button, Icon, Tooltip } from "antd";
import italicIcon from "../icon/italic.svg";

import { ENTER_DELAY, LEAVE_DELAY } from "../utils/constant";

@inject("content")
@observer
class Italic extends Component {

  handleClick = () => {

  }

  render() {
    return (
      <Tooltip
        placement="bottom"
        mouseEnterDelay={ENTER_DELAY}
        mouseLeaveDelay={LEAVE_DELAY}
        title="斜体"
      >
        <Button onClick={this.handleClick} style={style.btnPadding}>
          <Icon component={italicIcon} style={style.iconSize}/>
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

export default Italic;
