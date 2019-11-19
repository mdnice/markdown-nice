import React, {Component} from "react";
import {Tooltip, Button} from "antd";
import {observer, inject} from "mobx-react";

// import fullscreenIcon from "../icon/fullscreen.svg";
import {ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";
import SvgIcon from "../../icon";
import "./FullScreen.css";

@inject("navbar")
@observer
class FullScreen extends Component {
  // fullScreen or !fullScreen
  toggleFullScreen = () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    const cancelFullScreen =
      doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

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
      <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="全屏">
        <Button className="nice-btn-fullscreen" onClick={this.toggleFullScreen}>
          <SvgIcon name="fullscreen" className="nice-btn-fullscreen-icon" />
        </Button>
      </Tooltip>
    );
  }
}

export default FullScreen;
