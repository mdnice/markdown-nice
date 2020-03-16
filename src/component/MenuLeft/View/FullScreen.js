import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import "../common.css";

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
      <div id="nice-menu-full-screen" className="nice-menu-item" onClick={this.toggleFullScreen}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">全屏</span>
        </span>
      </div>
    );
  }
}

export default FullScreen;
