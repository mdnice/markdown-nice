import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Tooltip} from "antd";

import {ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";
import SvgIcon from "../../icon";

import "./Setting.css";

@inject("dialog")
@observer
class Setting extends Component {
  showModal = () => {
    this.props.dialog.setSettingOpen(true);
  };

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY}>
        <Button className="nice-btn-setting" onClick={this.showModal}>
          <SvgIcon name="setting" className="nice-btn-setting-icon" />
        </Button>
      </Tooltip>
    );
  }
}

export default Setting;
