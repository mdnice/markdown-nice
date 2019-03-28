import React from 'react';
import githubIcon from '../icon/github.svg'
import githubOnIcon from '../icon/githubOn.svg'
import { Tooltip, Button, Icon } from 'antd';

import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET, PROXY, ACCESS_TOKEN } from '../utils/constant.js';
import { queryParse, axiosJSON, axiosGithub } from '../utils/helper';
import { observer, inject } from "mobx-react";

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
      axios.defaults.headers.common['Authorization'] = `token ${TOKEN}`;
      this.getUserInfo();
    }
  }

  login = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=public_repo`;
  }

  loginBack = async () => {
    const res = await axiosJSON.post(PROXY, {
      code: this.code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    });
    localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
    window.location.href = '/'
  }

  getUserInfo = async () => {
    try {
      const res = await axiosGithub.get(`/user`);
      this.props.userInfo.updateUserInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={0.5} mouseLeaveDelay={0.2} title={this.props.userInfo.userInfo.login ? '我的' : '登录'}>
        <Button style={{ padding: "0 8px" }} onClick={this.login}>
          <Icon component={this.props.userInfo.userInfo.login ? githubOnIcon : githubIcon} style={{ fontSize: "20px" }}></Icon>
        </Button>
      </Tooltip>
    );
  }
}

export default LogIn;