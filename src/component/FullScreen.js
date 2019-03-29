import React, { Component } from "react";
import { Tooltip, Button, Icon } from "antd";

import fullscreenIcon from "../icon/fullscreen.svg";
import { ENTER_DELAY, LEAVE_DELAY } from "../utils/constant";

class FullScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false
    };
  }

  //fullScreen or !fullScreen
  toggleFullScreen = () => {
    this.setState(prevState => ({
      isFullScreen: !prevState.isFullScreen
    }));

    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    var cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  };

  render() {
    return (
      <Tooltip
        placement="bottom"
        mouseEnterDelay={ENTER_DELAY}
        mouseLeaveDelay={LEAVE_DELAY}
        title="全屏"
      >
        <Button style={{ padding: "0 8px" }} onClick={this.toggleFullScreen}>
          <Icon component={fullscreenIcon} style={{ fontSize: "18px" }} />
        </Button>
      </Tooltip>
    );
  }
}

export default FullScreen;
