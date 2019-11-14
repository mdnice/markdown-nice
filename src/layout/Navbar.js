import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button} from "antd";
import classnames from "classnames";

import ThemeSelect from "../component/ThemeSelect";
import Format from "../component/Format";
import Copy from "../component/Copy";
import Reset from "../component/Reset";
import Image from "../component/Image";
import Link from "../component/Link";
import Form from "../component/Form";
import Code from "../component/Code";
import Italic from "../component/Italic";
import Bold from "../component/Bold";
import Del from "../component/Del";
import PreviewType from "../component/PreviewType";
import FullScreen from "../component/FullScreen";
// import LogIn from "../component/LogIn";
// import User from "../component/User";
import About from "../component/About";
import Font from "../component/Font";

import "./Navbar.css";

const ButtonGroup = Button.Group;

// @inject("userInfo")
@inject("navbar")
@observer
class Navbar extends Component {
  render() {
    const {title} = this.props;
    const niceNavbarClass = classnames({
      "nice-navbar": true,
      "nice-navbar-hide": this.props.navbar.isImmersiveEditing,
    });
    return (
      <div className={niceNavbarClass}>
        <div className="nice-left-nav">
          {title === "" ? null : <section className="nice-title">{title}</section>}
          <div className="nice-icon-bar">
            <ButtonGroup className="nice-btn-group-margin">
              <Del />
              <Bold />
              <Italic />
              <Code />
            </ButtonGroup>
            <ButtonGroup className="nice-btn-group-margin">
              <Link />
              <Image />
              <Form />
            </ButtonGroup>
            <ButtonGroup className="nice-btn-group-margin">
              <FullScreen />
              <Font />
              <Reset />
              <About />
            </ButtonGroup>
          </div>
        </div>
        <div className="nice-right-nav">
          <Copy />
          <ThemeSelect />
          <Format />
          <PreviewType />

          {/* {this.props.userInfo.userInfo.login ? <User /> : <LogIn />} */}
        </div>
      </div>
    );
  }
}

export default Navbar;
