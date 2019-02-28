import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import markdownIt from 'markdown-it';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';


import { CLIENT_ID, CLIENT_SECRET, PROXY, ACCESS_TOKEN } from './utils/constant.js';
import { queryParse, axiosJSON, axiosGithub } from './utils/helper';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      failed: '',
      isFullScreen: false,
      content: '# Guan Peng is a chou Pig',
      title: '',
      code: '',
      marked_text: ''
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

    this.md = new markdownIt({
      highlight: (str, lang) => {
        console.log(' come in', str, lang);
        if (lang && highlightjs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
              highlightjs.highlight(lang, str, true).value +
              '</code></pre>';
          } catch (__) { }
        }
        return '<pre class="hljs"><code>' + this.md.utils.escapeHtml(str) + '</code></pre>';
      }
    });

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

  changeContent = (editor, changeObj) => {
    console.log(editor.getValue());
    console.log(changeObj)
    let editorContent = editor.getValue();
    let markedContent = this.md.render(editorContent);
    this.setState({ content: editorContent, marked_text: markedContent });
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

        </div>


        <div className="text-container">
          <div className="written-area text-box">
            <CodeMirror
              value={this.state.content}
              options={{
                theme: '3024-day',
                keyMap: 'sublime',
                mode: 'markdown',
              }}
              onChange={this.changeContent}
            />
          </div>

          <div className="divide-bar"></div>

          <div id="marked-text" className="text-box" dangerouslySetInnerHTML={{ __html: this.state.marked_text }}></div>
        </div>

      </div>
    );
  }
}

export default App;
