import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Tooltip} from "antd";

import {ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";
import SvgIcon from "../../icon";
import "./PreviewType.css";

@inject("navbar")
@observer
class PreviewType extends Component {
  handleClick = (key) => {
    this.props.navbar.setPreviewType(key);
  };

  render() {
    const targetType = this.props.navbar.previewType === "pc" ? "mobile" : "pc";

    return (
      <Tooltip placement="left" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="预览模式">
        <a id="nice-sidebar-preview-type" className="nice-btn-previewtype" onClick={() => this.handleClick(targetType)}>
          <SvgIcon name={targetType} className="nice-btn-previewtype-icon" />
        </a>
      </Tooltip>
    );
  }
}

export default PreviewType;
