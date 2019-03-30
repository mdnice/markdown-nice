import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Button } from "antd";

// import FullScreen from "../component/FullScreen";
import ThemeSelect from "../component/ThemeSelect";
import Copy from "../component/Copy";
import Reset from "../component/Reset";
import Image from "../component/Image";
import Link from "../component/Link";
import Code from "../component/Code";
import Italic from "../component/Italic";
import Bold from "../component/Bold";
import Del from "../component/Del";
import Title from "../component/Title";
// import LogIn from "../component/LogIn";

const ButtonGroup = Button.Group;

@inject("title")
@observer
class Navbar extends Component {

  changeTitle = event => {
    this.props.title.setTitle(event.target.value);
  };

  render() {
    return (
      <div style={style.navBar}>
        <div style={style.leftNav}>
          <Title />
          <ButtonGroup>
            <Del />
            <Bold />
            <Italic />
            <Code />
            <Link />
            <Image />
            <Reset />
          </ButtonGroup>
        </div>
        <div style={style.rightNav}>
          <Copy />
          <ThemeSelect />
          {/* <Save /> */}
          {/* <FullScreen /> */}
          {/* <LogIn /> */}
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
    flex: "1 1 50%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  rightNav: {
    flex: "1 1 50%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  }
};

export default Navbar;
