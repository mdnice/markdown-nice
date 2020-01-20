import React from "react";
import {Tooltip, Button} from "antd";
import {observer, inject} from "mobx-react";
import axios from "axios";

import {CLIENT_ID, CLIENT_SECRET, PROXY, ACCESS_TOKEN, ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";
import {queryParse, axiosJSON, axiosGithub} from "../../utils/helper";
import SvgIcon from "../../icon";

@inject("userInfo")
@observer
class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.code = queryParse().code;
    if (this.code) {
      this.loginBack();
    }
    const TOKEN = localStorage.getItem(ACCESS_TOKEN);
    if (TOKEN) {
      axios.defaults.headers.common.Authorization = `token ${TOKEN}`;
      this.getUserInfo();
    }
  }

  login = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=public_repo`;
  };

  loginBack = async () => {
    const res = await axiosJSON.post(PROXY, {
      code: this.code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });
    localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
    window.location.href = "/";
  };

  getUserInfo = async () => {
    try {
      const res = await axiosGithub.get(`/user`);
      this.props.userInfo.setUserInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="登录">
        <Button shape="circle" className="nice-btn-login" onClick={this.login}>
          <SvgIcon name="github" className="nice-btn-login-icon" />
        </Button>
      </Tooltip>
    );
  }
}

export default LogIn;
