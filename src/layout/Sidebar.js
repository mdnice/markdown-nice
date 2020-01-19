import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import classnames from "classnames";

import PreviewType from "../component/Sidebar/PreviewType";
import Wechat from "../component/Sidebar/Wechat";
import Zhihu from "../component/Sidebar/Zhihu";
import "./Sidebar.css";

// @inject("userInfo")
@inject("navbar")
@observer
class Navbar extends Component {
  render() {
    const niceNavbarClass = classnames({
      "nice-sidebar": true,
      "nice-sidebar-hide": this.props.navbar.isImmersiveEditing,
    });
    return (
      <div className={niceNavbarClass}>
        <Wechat />
        <Zhihu />
        <PreviewType />
      </div>
    );
  }
}

export default Navbar;
