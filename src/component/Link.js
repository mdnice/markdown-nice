import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Icon, Tooltip} from "antd";

import {ENTER_DELAY, LEAVE_DELAY} from "../utils/constant";
import linkIcon from "../icon/link.svg";

@inject("dialog")
@observer
class Link extends Component {
  showModal = () => {
    this.props.dialog.setLinkOpen(true);
  };

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="链接">
        <Button style={style.btnPadding} onClick={this.showModal}>
          <Icon component={linkIcon} style={style.iconSize} />
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

export default Link;
