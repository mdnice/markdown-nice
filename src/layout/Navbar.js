import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, Input} from "antd";

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
import FullScreen from "../component/FullScreen";
import LogIn from "../component/LogIn";
import User from "../component/User";
import About from "../component/About";
import Font from "../component/Font";

const ButtonGroup = Button.Group;

@inject("userInfo")
@observer
class Navbar extends Component {
  // changeTitle = event => {
  //   this.props.title.setTitle(event.target.value);
  // };

  render() {
    const {title, onTitleChange} = this.props;
    return (
      <div style={style.navBar} className="mdnice-navbar">
        <div style={style.leftNav}>
          {/* <Title /> */}
          <Input style={style.title} defaultValue={title} onChange={({target: {value}}) => onTitleChange(value)} />
        </div>
        <div style={style.rightNav}>
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
            </ButtonGroup>
          </div>
          <Copy />
          <About />
          <ThemeSelect />
          <Format />
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
    padding: "20px",
  },
  leftNav: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
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
    paddingBottom: 3,
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 26,
    minWidth: "50%",
    maxWidth: "80%",
    border: 0,
    borderBottom: "1px solid #d9d9d9",
  },
};

export default Navbar;
