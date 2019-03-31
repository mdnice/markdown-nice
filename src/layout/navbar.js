import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Button } from "antd";

import ThemeSelect from "../component/ThemeSelect";
import Copy from "../component/Copy";
import Reset from "../component/Reset";
import Image from "../component/Image";
import Link from "../component/Link";
import Code from "../component/Code";
import Italic from "../component/Italic";
import Bold from "../component/Bold";
import Del from "../component/Del";
import FullScreen from "../component/FullScreen";
// import Title from "../component/Title";
import LogIn from "../component/LogIn";
import User from "../component/User";

const ButtonGroup = Button.Group;

@inject("title")
@inject("userInfo")
@observer
class Navbar extends Component {
  changeTitle = event => {
    this.props.title.setTitle(event.target.value);
  };

  render() {
    return (
      <div style={style.navBar}>
        <div style={style.leftNav}>
          {/* <Title /> */}
          <ButtonGroup style={style.btnGroupMargin}>
            <Del />
            <Bold />
            <Italic />
            <Code />
            <Link />
            <Image />
          </ButtonGroup>
          <ButtonGroup>
            <Reset />
            <FullScreen />
          </ButtonGroup>
        </div>
        <div style={style.rightNav}>
          <Copy />
          <ThemeSelect />
          {/* <Save /> */}
          {this.props.userInfo.userInfo.login ? <User /> : <LogIn />}
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
    padding: "20px"
  },
  leftNav: {
    flex: "1 1 60%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  rightNav: {
    flex: "1 1 40%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  btnGroupMargin: {
    marginRight: "10px"
  }
};

export default Navbar;
