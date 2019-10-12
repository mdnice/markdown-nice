import React, {Component} from "react";
import {Tooltip, Button} from "antd";

// import fullscreenIcon from "../icon/fullscreen.svg";
import {ENTER_DELAY, LEAVE_DELAY} from "../utils/constant";
import SvgIcon from "../icon";

class FullScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
    };
  }

  // fullScreen or !fullScreen
  toggleFullScreen = () => {
    this.setState((prevState) => ({
      isFullScreen: !prevState.isFullScreen,
    }));

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
        <Button style={style.btnPadding} onClick={this.toggleFullScreen}>
          <SvgIcon name="fullscreen" style={style.svgIcon} />
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
    padding: "7px 7px 11px 7px",
    width: "33px",
    height: "33px",
  },
};

export default FullScreen;
