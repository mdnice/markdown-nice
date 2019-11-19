import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Tooltip} from "antd";

import {ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";
import SvgIcon from "../../icon";
import "./About.css";

@inject("dialog")
@observer
class About extends Component {
  handleClick = () => {
    this.props.dialog.setAboutOpen(true);
  };

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="关于">
        <Button className="nice-btn-about" onClick={this.handleClick}>
          <SvgIcon name="about" className="nice-btn-about-icon" />
        </Button>
      </Tooltip>
    );
  }
}

export default About;
