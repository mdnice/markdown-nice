import React from 'react';
import NavIcon from './NavIcon';
import githubIcon from '../icon/github.svg'
import githubOnIcon from '../icon/githubOn.svg'

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
      <NavIcon title={this.props.userInfo.userInfo.login ? 'Online' : 'Log in GitHub'} onClick={this.login} src={this.props.userInfo.userInfo.login ? githubOnIcon : githubIcon} alt="log in"></NavIcon>
    );
  }
}

export default LogIn;