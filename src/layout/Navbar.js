import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button} from "antd";

import ThemeSelect from "../component/ThemeSelect";
import Format from "../component/Format";
import Copy from "../component/Copy";
import Reset from "../component/Reset";
import Image from "../component/Image";
import Link from "../component/Link";
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

const ButtonGroup = Button.Group;

// @inject("userInfo")
// @observer
class Navbar extends Component {
  render() {
    const {title} = this.props;
    return (
      <div style={style.navBar}>
        <div style={style.leftNav}>
          {title === "" ? null : <section style={style.title}>{title}</section>}
          <div style={style.iconBar}>
            <ButtonGroup style={style.btnGroupMargin}>
              <Del />
              <Bold />
              <Italic />
              <Code />
            </ButtonGroup>
            <ButtonGroup style={style.btnGroupMargin}>
              <Link />
              <Image />
            </ButtonGroup>
            <ButtonGroup style={style.btnGroupRight}>
              <Reset />
              <FullScreen />
              <Font />
              <About />
            </ButtonGroup>
          </div>
        </div>
        <div style={style.rightNav}>
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

const style = {
  navBar: {
    height: "64px",
    display: "flex",
    justifyContent: "space-between",
    flex: "none",
    padding: "20px",
  },
  leftNav: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rightNav: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btnGroupMargin: {
    marginRight: "10px",
  },
  btnGroupRight: {
    marginRight: "20px",
  },
  iconBar: {
    marginTop: 5,
  },
  title: {
    marginRight: "20px",
    fontWeight: "bold",
    fontSize: "16px",
    fontFamily: "Apple Chancery, cursive",
  },
};

export default Navbar;
