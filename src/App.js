import React, {Component} from "react";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "antd/dist/antd.css";
import {observer, inject} from "mobx-react";

import Dialog from "./layout/Dialog";
import Navbar from "./layout/Navbar";
import StyleEditor from "./layout/StyleEditor";

import "./App.css";
import "./utils/mdMirror.css";

import {markdownParser, markdownParserWechat, updateMathjax} from "./utils/helper";
import pluginCenter from "./utils/pluginCenter";
import appContext from "./utils/appContext";
import {uploadAdaptor} from "./utils/imageHosting";

@inject("content")
@inject("navbar")
@inject("dialog")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.focus = false;
    this.scale = 1;
  }

  componentDidMount() {
    try {
      window.MathJax = {
        tex: {
          inlineMath: [["$", "$"]],
          displayMath: [["$$", "$$"]],
        },
        svg: {
          fontCache: "none",
        },
        options: {
          renderActions: {
            addMenu: [0, "", ""],
          },
        },
        startup: {
          ready: () => {
            window.MathJax.startup.defaultReady();
            window.MathJax.startup.promise.then(() => {
              const element = document.getElementById("layout");
              let html = element.innerHTML;
              html = html.replace(
                /<mjx-container.+?display.+?>(.+?)<\/mjx-container>/g,
                '<section class="block-equation">$1</section>',
              );
              html = html.replace(
                /<mjx-container.+?>(.+?)<\/mjx-container>/g,
                '<span class="inline-equation">$1</span>',
              );
              element.innerHTML = html;
            });
          },
        },
      };
      // eslint-disable-next-line
      require("mathjax/es5/tex-svg-full");
      pluginCenter.mathjax = true;
    } catch (e) {
      console.log(e);
    }
    this.setEditorContent();
  }

  componentDidUpdate() {
    if (pluginCenter.mathjax) {
      try {
        updateMathjax();
      } catch (e) {
        this.mathJaxTimer = setTimeout(() => {
          updateMathjax();
        }, 1000);
      }
    }
  }

  componentWillUnmount() {
    this.mathJaxTimer && clearTimeout(this.mathJaxTimer);
  }

  setEditorContent = () => {
    const {defaultText} = this.props;
    if (defaultText) {
      this.props.content.setContent(defaultText);
    }
  };

  setCurrentIndex(index) {
    this.index = index;
  }

  getInstance = (instance) => {
    if (instance) {
      this.props.content.setMarkdownEditor(instance.editor);
    }
  };

  handleScroll = () => {
    const {markdownEditor} = this.props.content;
    const cmData = markdownEditor.getScrollInfo();
    const editorToTop = cmData.top;
    const editorScrollHeight = cmData.height - cmData.clientHeight;
    this.scale = (this.previewWrap.offsetHeight - this.previewContainer.offsetHeight + 55) / editorScrollHeight;
    if (this.index === 1) {
      this.previewContainer.scrollTop = editorToTop * this.scale;
    } else {
      this.editorTop = this.previewContainer.scrollTop / this.scale;
      markdownEditor.scrollTo(null, this.editorTop);
    }
  };

  handleChange = (editor) => {
    if (this.focus) {
      const content = editor.getValue();
      this.props.content.setContent(content);
      this.props.onTextChange && this.props.onTextChange(content);
    }
  };

  handleFocus = () => {
    this.focus = true;
  };

  handleBlur = () => {
    this.focus = false;
  };

  getStyleInstance = (instance) => {
    if (instance) {
      this.styleEditor = instance.editor;
      this.styleEditor.on("keyup", (cm, e) => {
        if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 189) {
          cm.showHint(e);
        }
      });
    }
  };

  handleDrop = (instance, e) => {
    // e.preventDefault();
    // console.log(e.dataTransfer.files[0]);
    if (!(e.dataTransfer && e.dataTransfer.files)) {
      return;
    }
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      // console.log(e.dataTransfer.files[i]);
      uploadAdaptor({file: e.dataTransfer.files[i], content: this.props.content});
    }
  };

  handlePaste = (instance, e) => {
    if (e.clipboardData && e.clipboardData.files) {
      for (let i = 0; i < e.clipboardData.files.length; i++) {
        uploadAdaptor({file: e.clipboardData.files[i], content: this.props.content});
      }
    }
  };

  render() {
    const {codeNum, isStyleEditorOpen, previewType} = this.props.navbar;

    const parseHtml =
      codeNum === 0
        ? markdownParserWechat.render(this.props.content.content)
        : markdownParser.render(this.props.content.content);

    return (
      <appContext.Consumer>
        {({defaultTitle}) => (
          <div className="App">
            <Navbar title={defaultTitle} />
            <div className="text-container">
              <div className="text-box" onMouseOver={(e) => this.setCurrentIndex(1, e)}>
                <CodeMirror
                  value={this.props.content.content}
                  options={{
                    theme: "md-mirror",
                    keyMap: "sublime",
                    mode: "markdown",
                    lineWrapping: true,
                    lineNumbers: false,
                  }}
                  onChange={this.handleChange}
                  onScroll={this.handleScroll}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  onDrop={this.handleDrop}
                  onPaste={this.handlePaste}
                  ref={this.getInstance}
                />
              </div>
              <div id="marked-text" className="text-box" onMouseOver={(e) => this.setCurrentIndex(2, e)}>
                <div
                  id="wx-box"
                  className="wx-box"
                  onScroll={this.handleScroll}
                  style={{width: previewType === "pc" ? "100%" : 375}}
                  ref={(node) => {
                    this.previewContainer = node;
                  }}
                >
                  <section
                    id="layout"
                    className="layout"
                    dangerouslySetInnerHTML={{
                      __html: parseHtml,
                    }}
                    ref={(node) => {
                      this.previewWrap = node;
                    }}
                  />
                </div>
              </div>

              {isStyleEditorOpen ? (
                <div className="text-box">
                  <StyleEditor />
                </div>
              ) : null}

              <Dialog />
            </div>
          </div>
        )}
      </appContext.Consumer>
    );
  }
}

export default App;
