import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Tooltip} from "antd";

// import imageIcon from "../icon/image.svg";
import {ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";
import SvgIcon from "../../icon";
import "./Image.css";

@inject("content")
@inject("dialog")
@observer
class Image extends Component {
  showModal = () => {
    this.props.dialog.setImageOpen(true);
  };

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="图片">
        <Button className="nice-btn-image" onClick={this.showModal}>
          <SvgIcon name="image" className="nice-btn-image-icon" />
        </Button>
      </Tooltip>
    );
  }
}

export default Image;
