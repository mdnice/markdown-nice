import React, { Component } from 'react';
import fullscreenIcon from '../icon/fullscreen.svg';
import NavIcon from './NavIcon'

class FullScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
    }
  }

  //fullScreen or !fullScreen
  fullScreen = () => {
    this.setState(prevState => ({
      isFullScreen: !prevState.isFullScreen
    }));

    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    }
    else {
      cancelFullScreen.call(doc);
    }
  }

  render() {
    return (
      <NavIcon title="全屏" onClick={this.fullScreen} src={fullscreenIcon} alt="full screen"></NavIcon>
    );
  }
}

export default FullScreen;