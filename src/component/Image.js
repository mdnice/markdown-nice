import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Tooltip} from "antd";

// import imageIcon from "../icon/image.svg";
import {ENTER_DELAY, LEAVE_DELAY} from "../utils/constant";
import SvgIcon from "../icon";

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
        <Button style={style.btnPadding} onClick={this.showModal}>
          <SvgIcon name="image" style={style.svgIcon} />
        </Button>
      </Tooltip>
    );
  }
}

const style = {
  btnPadding: {
    padding: "0",
  },
  svgIcon: {
    padding: "6px 7px 10px 7px",
    width: "33px",
    height: "33px",
  },
};

export default Image;
