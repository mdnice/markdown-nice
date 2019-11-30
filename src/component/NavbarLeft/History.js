import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Tooltip} from "antd";

import {ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";
import SvgIcon from "../../icon";
import "./History.css";

@inject("dialog")
@observer
class History extends Component {
  handleClick = () => {
    this.props.dialog.setHistoryOpen(true);
  };

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="本地历史">
        <Button className="nice-btn-history" onClick={this.handleClick}>
          <SvgIcon name="history" className="nice-btn-history-icon" />
        </Button>
      </Tooltip>
    );
  }
}

export default History;
