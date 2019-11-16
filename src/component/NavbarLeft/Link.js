import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Tooltip} from "antd";

import {ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";
import SvgIcon from "../../icon";
import "./Link.css";

@inject("dialog")
@observer
class Link extends Component {
  showModal = () => {
    this.props.dialog.setLinkOpen(true);
  };

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="链接">
        <Button className="nice-btn-link" onClick={this.showModal}>
          <SvgIcon name="link" className="nice-btn-link-icon" />
        </Button>
      </Tooltip>
    );
  }
}

export default Link;
