import React from "react";
import {Tooltip, Button, Dropdown, Menu} from "antd";

import {ENTER_DELAY, LEAVE_DELAY, USERNAME, TOKEN, AVATAR, EMAIL, USERID} from "../../utils/constant";
import {getCookie, removeCookie} from "../../utils/helper";
import SvgIcon from "../../icon";
import "./User.css";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: getCookie(TOKEN),
      username: getCookie(USERNAME),
    };
  }

  login = () => {
    const w = window.open("about:blank");
    w.location.href = `https://preview.mdnice.com/login`;
  };

  handleExit = () => {
    removeCookie(USERNAME);
    removeCookie(AVATAR);
    removeCookie(USERID);
    removeCookie(EMAIL);
    removeCookie(TOKEN);
    this.setState({token: "", username: ""});
  };

  render() {
    const {token, username} = this.state;
    const userMenu = (
      <Menu>
        <Menu.Item>
          <a onClick={this.handleExit}>退出登录</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <>
        {token ? (
          <Dropdown overlay={userMenu} placement="bottomRight">
            <span className="nice-username">{username}</span>
          </Dropdown>
        ) : (
          <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="登录">
            <Button shape="circle" className="nice-btn-login" onClick={this.login}>
              <SvgIcon name="user" className="nice-btn-login-icon" />
            </Button>
          </Tooltip>
        )}
      </>
    );
  }
}

export default User;
