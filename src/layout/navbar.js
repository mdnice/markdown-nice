import React, { Component } from 'react';
import '../App.css'
import axios from 'axios';

import { CLIENT_ID, CLIENT_SECRET, PROXY, ACCESS_TOKEN } from '../utils/constant.js';
import { queryParse, axiosJSON, axiosGithub } from '../utils/helper';


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
      code: '',
      themeValue: 'normal'
    }
    const CODE = queryParse().code;
    this.state.code = CODE;
    if (CODE) {
      this.loginBack();
    }
    const TOKEN = localStorage.getItem(ACCESS_TOKEN);
    if (TOKEN) {
      axios.defaults.headers.common['Authorization'] = `token ${TOKEN}`;
    }
  }

  createRepo = async () => {
    try {
      const response = await axiosGithub.post('/user/repos', {
        "name": "markdown_example1",
        "auto_init": true
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  changeTitle = (event) => {
    this.setState({ title: event.target.value });
    console.log(this.state.title);
  }



  login = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=public_repo`;
  }

  loginBack = async () => {
    const res = await axiosJSON.post(PROXY, {
      code: this.state.code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    });
    console.log(res);
    localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
    window.location.href = '/'
  }

  //fullScreen or !fullScreen
  fullScreen = () => {
    this.setState(prevState => ({
      isFullScreen: !prevState.isFullScreen
    }));

    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    }
    else {
      cancelFullScreen.call(doc);
    }
  }

  selectTheme = (event) => {
    this.setState({ themeValue: event.target.value });
    var el = document.getElementById('markdown-theme');
    el.href = `./markdown-css/${event.target.value}.css`;
  }

  //commit the file

  commitFile = async () => {
    try {
      const response = await axiosGithub.put(`/repos/zhning12/markdown_example/contents/${this.state.title}.md`, {
        "message": "I am the commit message",
        "content": btoa(this.state.content)
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="navi-bar">
        <div className="left-nav"></div>
        <div className="right-nav"></div>

        <button onClick={this.login}>点击登录</button>

        <button onClick={this.fullScreen} id="goFS">
          {this.state.isFullScreen ? '取消全屏' : '全屏'}
        </button>

        <button onClick={this.createRepo} id="createRepo">
          Create a New Repo
          </button>

        <input id="fileName" type='text' value={this.state.title} onChange={this.changeTitle} />
        <button onClick={this.commitFile} id="commitFile">
          commit the file
          </button>

        <select id="theme-selector" value={this.state.themeValue}
          onChange={this.selectTheme} >
          <option value="normal">默认样式</option>
          <option value='test'>标题下边框</option>
          <option value="titleBackground">标题背景</option>
          <option value="titlecolor">标题颜色</option>
          <option value="titleHandsome">标题酷酷</option>
        </select>
      </div>
    );
  }
}

export default Navbar;