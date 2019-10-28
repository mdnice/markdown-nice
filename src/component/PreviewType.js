import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Tooltip} from "antd";

import {ENTER_DELAY, LEAVE_DELAY} from "../utils/constant";
import SvgIcon from "../icon";

@inject("navbar")
@observer
class PreviewType extends Component {
  handleClick = (key) => {
    this.props.navbar.setPreviewType(key);
  };

  render() {
    const targetType = this.props.navbar.previewType === "pc" ? "mobile" : "pc";

    return (
      <Tooltip placement="left" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="切换预览模式">
        <Button style={style.btnPadding} onClick={() => this.handleClick(targetType)}>
          <SvgIcon name={targetType} style={style.svgIcon} />
        </Button>
      </Tooltip>
    );
  }
}

const style = {
  btnPadding: {
    padding: "0",
  },
  dropdownButton: {
    padding: "3px 0",
  },
  svgIcon: {
    padding: "7px 7px 9px 7px",
    width: "33px",
    height: "33px",
  },
};

export default PreviewType;
