import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';


import { CLIENT_ID, CLIENT_SECRET, PROXY, ACCESS_TOKEN } from './utils/constant.js';
import { queryParse, axiosJSON, axiosGithub } from './utils/helper';

const code = '# guan peng shi zhu chou zhu da chou zhu';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      failed: '',
      isFullScreen: false,
      content: '',
      title: '',
      code: ''
    };
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

  changeContent = (event) => {
    this.setState({ content: event.target.value });
    console.log(this.state.content);
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

  render() {
    return (
      <div className="App">
        <button onClick={this.login}>点击登录</button>

        <button onClick={this.fullScreen} id="goFS">
          {this.state.isFullScreen ? 'ON' : 'OFF'}
        </button>
        <button onClick={this.createRepo} id="createRepo">
          Create a New Repo
      </button>
        <input id="fileName" type='text' value={this.state.title} onChange={this.changeTitle} />
        <input id="fileContent" type="text" value={this.state.content} onChange={this.changeContent} />
        <button onClick={this.commitFile} id="commitFile">
          commit the file
      </button>
        <CodeMirror
          value={code}
          options={{
            theme: 'monokai',
            keyMap: 'sublime',
            mode: 'markdown',
          }}
        />

      </div>
    );
  }
}

export default App;
