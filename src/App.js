import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import markdownIt from 'markdown-it';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';


import { CLIENT_ID, CLIENT_SECRET, PROXY, ACCESS_TOKEN, MARKDOWN_EXAMPLE } from './utils/constant.js';
import { queryParse, axiosJSON, axiosGithub } from './utils/helper';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      failed: '',
      isFullScreen: false,
      content: MARKDOWN_EXAMPLE,
      title: '',
      code: '',
      marked_text: '',
      themeValue: 'normal'
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
    this.scale = 1;
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
    let editorContent = editor.getValue();
    let markedContent = this.md.render(editorContent);
    this.setState({
      content: editorContent,
      marked_text: markedContent
    });
    this.hasContentChanged = true;
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

  changeTheme = () => {
    var el = document.getElementById('markdown-theme');
    el.href = './markdown-css/titlecolor.css';
  }

  selectTheme = (event) => {
    this.setState({ themeValue: event.target.value });
    var el = document.getElementById('markdown-theme');
    el.href = `./markdown-css/${event.target.value}.css`;
  }

  setCurrentIndex(index, e) {
    this.index = index;
    console.log(e);
  }

  containerScroll = () => {
    let cmData = this.cm.getScrollInfo();
    console.log(cmData);
    let editorToTop = cmData.top;
    let editorScrollHeight = cmData.height - cmData.clientHeight;
    console.log('top:', editorToTop, 'editorScrollHeight:', editorScrollHeight);
    this.hasContentChanged && this.setScrollValue(editorScrollHeight);
    this.previewContainer.scrollTop = editorToTop * this.scale;



  }
  containerScroll2 = () => {
    //   e.scrollIntoView();
    //   this.editContainer.scrollTop = this.previewContainer.scrollTop / this.scale;
  }
  setScrollValue = (editorScrollHeight) => {
    // 设置值，方便 scrollBy 操作
    this.scale = (this.previewWrap.offsetHeight - this.previewContainer.offsetHeight) / editorScrollHeight;
    this.hasContentChanged = false;
    console.log(this.scale);
  }

  focusTest = (e) => {
    console.log('focus')
    console.log(e.getScrollInfo());
    this.cm = e;
  }
  render() {
    const cm = <CodeMirror
    value={this.state.content}
    options={{
      theme: '3024-day',
      keyMap: 'sublime',
      mode: 'markdown',
      lineWrapping: true,
      autofocus: true,
    }} id="marked-editor"
    onChange={this.changeContent}
    // onMouseOver={(e) => this.setCurrentIndex(1, e)}
    // onScroll={this.containerScroll}
    onFocus={this.focusTest}

  />
  console.log(cm)
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

          <select id="theme-selector" value={this.state.themeValue}
            onChange={this.selectTheme} >
            <option value="normal">默认样式</option>
            <option value='test'>标题下边框</option>
            <option value="titleBackground">标题背景</option>
            <option value="titlecolor">标题颜色</option>
            <option value="titleHandsome">标题酷酷</option>
          </select>
        </div>


        <div className="text-container">
          <div className="text-box">

            <CodeMirror
              value={this.state.content}
              options={{
                theme: '3024-day',
                keyMap: 'sublime',
                mode: 'markdown',
                lineWrapping: true,
                autofocus: true,
              }} id="marked-editor"
              onChange={this.changeContent}
              // onMouseOver={(e) => this.setCurrentIndex(1, e)}
              // onScroll={this.containerScroll}

              onFocus={this.focusTest}
          
            />

          </div>

          {/* <div className="divide-bar"></div> */}

          <div id="marked-text" className="text-box" 
          // onScroll={this.containerScroll} 
          // onMouseOver={(e) => this.setCurrentIndex(2, e)} ref={node => this.previewContainer = node}
          >

            <div ref={node => this.previewWrap = node} dangerouslySetInnerHTML={{ __html: this.state.marked_text }}></div>

          </div>
        </div>

      </div>
    );
  }
}

export default App;
