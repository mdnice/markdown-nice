import React, {Component} from "react";

import {Modal} from "antd";

import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "antd/dist/antd.css";
import {observer, inject} from "mobx-react";

import Dialog from "./layout/Dialog";
import Navbar from "./layout/Navbar";
import StyleEditor from "./layout/StyleEditor";

import "./App.css";
import "./utils/mdMirror.css";

import {markdownParser, markdownParserWechat} from "./utils/helper";

@inject("content")
@inject("navbar")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.focus = false;
    this.scale = 1;
  }

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

  handleChange = (editor, changeObj) => {
    if (this.focus) {
      const content = editor.getValue();
      // 粘贴时检测
      if (this.props.navbar.isPasteCheckOpen && changeObj.origin === "paste") {
        const linkImgReg = /(!)*\[.*?\]\(((?!mp.weixin.qq.com).)*?\)/g;
        const res = content.match(linkImgReg); // 匹配到图片、链接和脚注

        if (res === null) {
          this.props.content.setContent(content);
          return;
        }

        const footReg = /.*?\(.*?"(.*?)".*?\)/;
        const filterRes = res.filter((val) => {
          const comment = val.match(footReg);
          if (val[0] === "!") {
            return false;
          }
          if (comment && comment[1] !== "") {
            return false;
          }
          return true;
        }); // 过滤掉图片和脚注

        if (filterRes.length > 0) {
          this.showConfirm(filterRes, content);
        } else {
          this.props.content.setContent(content);
        }
      } else {
        this.props.content.setContent(content);
      }
    }
  };

  showConfirm = (filterRes, content) => {
    Modal.confirm({
      title: "微信之外链接",
      content: "粘贴过程中检测到存在微信域名之外链接，是否自动转成脚注？",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        filterRes.forEach((val) => {
          const linkReg = /\[(.*?)\]\((.*?)\)/; // 匹配链接中具体的值
          const matchValue = val.match(linkReg);
          const name = matchValue[1];
          const url = matchValue[2].trim();

          const newVal = `[${name}](${url} "${name}")`;
          content = content.replace(val, newVal);
        });

        this.props.content.setContent(content);
      },
      onCancel: () => {
        this.props.content.setContent(content);
      },
    });
  };

  handleFocus = (e) => {
    this.focus = true;
  };

  handleBlur = (e) => {
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
    // console.log(e.dataTransfer.files[0]);
    if (!(e.dataTransfer && e.dataTransfer.files)) {
      return;
    }
    for (var i = 0; i < e.dataTransfer.files.length; i++) {
      // console.log(e.dataTransfer.files[i]);
      // fileUpload(e.dataTransfer.files[i]);
    }
    e.preventDefault();
  };

  render() {
    const {codeNum} = this.props.navbar;
    const parseHtml =
      codeNum === 0
        ? markdownParserWechat.render(this.props.content.content)
        : markdownParser.render(this.props.content.content);

    return (
      <div className="App">
        <Navbar />

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
              ref={this.getInstance}
            />
          </div>
          <div id="marked-text" className="text-box" onMouseOver={(e) => this.setCurrentIndex(2, e)}>
            <div
              id="wx-box"
              className="wx-box"
              onScroll={this.handleScroll}
              ref={(node) => {
                this.previewContainer = node;
              }}
            >
              <section
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

          {this.props.navbar.isStyleEditorOpen ? (
            <div className="text-box">
              <StyleEditor />
            </div>
          ) : null}

          <Dialog />
        </div>
      </div>
    );
  }
}

export default App;
