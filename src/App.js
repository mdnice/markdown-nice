import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Navbar from './layout/navbar';

import CodeMirror from '@uiw/react-codemirror';
import markdownIt from 'markdown-it';
import MarkdownItH from './utils/span';
import highlightjs from 'highlight.js';
// import 'highlight.js/styles/railscasts.css';
import juice from 'juice';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

import { Tooltip, Button, Icon } from 'antd';
import 'antd/dist/antd.css';
import copyIcon from './icon/copy.svg';

import { observer, inject } from "mobx-react";

@inject("content")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      markedText: '',
      cssStyle: '',
    };

    this.md = new markdownIt({
      highlight: (str, lang) => {
        if (lang && highlightjs.getLanguage(lang)) {
          try {
            return '<pre ><code class="hljs">' +
              highlightjs.highlight(lang, str, true).value +
              '</code></pre>';
          } catch (__) { }
        }
        return '<pre ><code class="hljs">' + this.md.utils.escapeHtml(str) + '</code></pre>';
      }
    });
    this.md.use(MarkdownItH, { addHeadingSpan: true, })
      // 上标
      .use(require('markdown-it-sup'))
      // 脚注
      .use(require('markdown-it-footnote'))
      // 下标
      .use(require('markdown-it-sub'))
      // 定义列表
      .use(require('markdown-it-deflist'));

    this.scale = 1;
    // this.hasContentChanged = true;
  }

  setCurrentIndex(index) {
    this.index = index;
  }

  getInstance = (instance) => {
    if (instance) {
      this.codemirror = instance.codemirror;
      this.editor = instance.editor;
    }
  }

  containerScroll = () => {
    let cmData = this.editor.getScrollInfo();
    let editorToTop = cmData.top;
    let editorScrollHeight = cmData.height - cmData.clientHeight;
    // console.log('top:', editorToTop, 'editorScrollHeight:', editorScrollHeight);
    // this.hasContentChanged && this.setScrollValue(editorScrollHeight);
    this.scale = (this.previewWrap.offsetHeight - this.previewContainer.offsetHeight + 44) / editorScrollHeight;
    // console.log('(this.previewWrap.offsetHeight:', this.previewWrap.offsetHeight, 'this.previewContainer.offsetHeight:', this.previewContainer.offsetHeight)
    // console.log(this.previewContainer.scrollTop);
    if (this.index === 1) {
      this.previewContainer.scrollTop = editorToTop * this.scale;
    } else {
      this.editorTop = this.previewContainer.scrollTop / this.scale;
      this.editor.scrollTo(null, this.editorTop);
    }
  }
  changeContent = (editor, changeObj) => {

    let editorContent = editor.getValue();
    let markedContent = this.md.render(editorContent);
    this.props.content.updateContent(editorContent);
    this.setState({
      markedText: markedContent
    });

    // this.hasContentChanged = true;

    // setScrollValue = (editorScrollHeight) => {
    //   // 设置值，方便 scrollBy 操作
    //   this.scale = (this.previewWrap.offsetHeight - this.previewContainer.offsetHeight) / editorScrollHeight;
  }
  // getCss = () => {
  //   this.getMdStyle();
  //   this.getCodeStyle();
  // }
  getCss = async () => {
    try {
      let el = document.getElementById('markdown-theme');
      let cssStyle = el.href;
      const response = await axios.get(cssStyle);
      let codeStyle = await axios.get('./code-styles/railscasts.css');
      // console.log(response.data);
      // this.setState({ cssStyle: response.data });
      var result = juice.inlineContent(this.state.markedText, response.data + codeStyle.data, { inlinePseudoElements: true });
      console.log(result);
      this.copyToClip(result);
    } catch (error) {
      console.error(error);
    }
  }
  // getCodeStyle = async () => {
  //   try { } catch{ }
  // }

  copyToClip = (str) => {
    function listener(e) {
      e.clipboardData.setData("text/html", str);
      e.clipboardData.setData("text/plain", str);
      e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
  };



  render() {
    return (
      <div className="App">
        <Navbar></Navbar>

        <div className="text-container">
          <div className="text-box" onMouseOver={(e) => this.setCurrentIndex(1, e)}>

            <CodeMirror
              value={this.props.content.commitContent}
              options={{
                theme: '3024-day',
                keyMap: 'sublime',
                mode: 'markdown',
                lineWrapping: true,
                autofocus: true,
              }} id="marked-editor"
              onChange={this.changeContent}
              onScroll={this.containerScroll}
              ref={this.getInstance}
            />
          </div>

          <div id="marked-text" className="text-box"
            onMouseOver={(e) => this.setCurrentIndex(2, e)}
          >
            <div className="wx-box" onScroll={this.containerScroll} ref={node => this.previewContainer = node}>
              <div dangerouslySetInnerHTML={{ __html: this.state.markedText }} ref={node => this.previewWrap = node} ></div>
            </div>

          </div>

          <Tooltip placement="bottom" mouseEnterDelay={0.5} mouseLeaveDelay={0.2} title="点击复制">
            <Button style={{ padding: "0 8px" }} className="getBtn" onClick={this.getCss}>
              <Icon component={copyIcon} style={{ fontSize: "18px" }}></Icon>
            </Button>
          </Tooltip>
        </div>

      </div>
    );
  }
}

export default App;

