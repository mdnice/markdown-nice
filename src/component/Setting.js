import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Tooltip} from "antd";

import {ENTER_DELAY, LEAVE_DELAY} from "../utils/constant";
import SvgIcon from "../icon";

@inject("dialog")
@observer
class Setting extends Component {
  showModal = () => {
    this.props.dialog.setSettingOpen(true);
  };

  render() {
    return (
      <div>
        <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="设置">
          <Button style={style.btnPadding} onClick={this.showModal}>
            <SvgIcon name="setting" style={style.svgIcon} />
          </Button>
        </Tooltip>
      </div>
    );
  }
}

const style = {
  btnPadding: {
    padding: "0",
    borderRadius: "4px",
  },
  svgIcon: {
    padding: "6px 7px 10px 7px",
    width: "33px",
    height: "33px",
  },
};

export default Setting;
