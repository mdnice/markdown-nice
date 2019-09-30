import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Icon, Tooltip} from "antd";

import imageIcon from "../icon/image.svg";
import {ENTER_DELAY, LEAVE_DELAY} from "../utils/constant";

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
          <Icon component={imageIcon} style={style.iconSize} />
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

export default Image;
