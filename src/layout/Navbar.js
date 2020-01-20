import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import classnames from "classnames";

import File from "../component/MenuLeft/File";
import Help from "../component/MenuLeft/Help";
import Pattern from "../component/MenuLeft/Pattern";
import Function from "../component/MenuLeft/Function";
import Theme from "../component/MenuLeft/Theme";
import CodeTheme from "../component/MenuLeft/CodeTheme";
import Setting from "../component/MenuLeft/Setting";

import "./Navbar.css";

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
          <File />
          <Pattern />
          <Function />
          <Theme />
          <CodeTheme />
          <Setting />
          <Help />
        </div>
        <div className="nice-right-nav" />
      </div>
    );
  }
}

export default Navbar;
