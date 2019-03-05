import React, { Component } from 'react';
import './App.css';
import Navbar from './layout/navbar';
import CodeMirror from '@uiw/react-codemirror';
import markdownIt from 'markdown-it';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

import { MARKDOWN_EXAMPLE } from './utils/constant.js';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      failed: '',
      content: MARKDOWN_EXAMPLE,
      title: '',
      marked_text: ''
    };

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
    this.hasContentChanged = true;
  }





  setCurrentIndex(index) {
    this.index = index;
    console.log(this.index);
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
    this.scale = (this.previewWrap.offsetHeight - this.previewContainer.offsetHeight) / editorScrollHeight;
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
    this.setState({
      content: editorContent,
      marked_text: markedContent
    });
    this.hasContentChanged = true;
  }
  // setScrollValue = (editorScrollHeight) => {
  //   // 设置值，方便 scrollBy 操作
  //   this.scale = (this.previewWrap.offsetHeight - this.previewContainer.offsetHeight) / editorScrollHeight;
  // }

  render() {

    return (
      <div className="App">
        <Navbar></Navbar>

        <div className="text-container">
          <div className="text-box" onMouseOver={(e) => this.setCurrentIndex(1, e)}>

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

              onScroll={this.containerScroll}
              ref={this.getInstance}
            />

          </div>

          <div id="marked-text" className="text-box"
            onScroll={this.containerScroll}
            onMouseOver={(e) => this.setCurrentIndex(2, e)} ref={node => this.previewContainer = node}
          >

            <div ref={node => this.previewWrap = node} dangerouslySetInnerHTML={{ __html: this.state.marked_text }}></div>

          </div>
        </div>

      </div>
    );
  }
}

export default App;
