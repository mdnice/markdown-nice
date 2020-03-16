import React, {Component} from "react";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/addon/search/searchcursor";
import "codemirror/keymap/sublime";
import "antd/dist/antd.css";
import {observer, inject} from "mobx-react";
import classnames from "classnames";
import throttle from "lodash.throttle";

import Dialog from "./layout/Dialog";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import StyleEditor from "./layout/StyleEditor";
import EditorMenu from "./layout/EditorMenu";
import SearchBox from "./component/SearchBox";

import "./App.css";
import "./utils/mdMirror.css";

import {
  LAYOUT_ID,
  BOX_ID,
  IMAGE_HOSTING_NAMES,
  IMAGE_HOSTING_TYPE,
  MJX_DATA_FORMULA,
  MJX_DATA_FORMULA_TYPE,
} from "./utils/constant";
import {markdownParser, markdownParserWechat, updateMathjax} from "./utils/helper";
import pluginCenter from "./utils/pluginCenter";
import appContext from "./utils/appContext";
import {uploadAdaptor} from "./utils/imageHosting";
import bindHotkeys, {betterTab, rightClick} from "./utils/hotkey";

@inject("content")
@inject("navbar")
@inject("view")
@inject("dialog")
@inject("imageHosting")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.focus = false;
    this.scale = 1;
    this.handleUpdateMathjax = throttle(updateMathjax, 1500);
  }

  componentDidMount() {
    document.addEventListener("fullscreenchange", this.solveScreenChange);
    document.addEventListener("webkitfullscreenchange", this.solveScreenChange);
    document.addEventListener("mozfullscreenchange", this.solveScreenChange);
    document.addEventListener("MSFullscreenChange", this.solveScreenChange);
    try {
      window.MathJax = {
        tex: {
          inlineMath: [["$", "$"]],
          displayMath: [["$$", "$$"]],
          tags: "ams",
        },
        svg: {
          fontCache: "none",
        },
        options: {
          renderActions: {
            addMenu: [0, "", ""],
            addContainer: [
              190,
              (doc) => {
                for (const math of doc.math) {
                  this.addContainer(math, doc);
                }
              },
              this.addContainer,
            ],
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
    this.setCustomImageHosting();
  }

  componentDidUpdate() {
    if (pluginCenter.mathjax) {
      this.handleUpdateMathjax();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("fullscreenchange", this.solveScreenChange);
    document.removeEventListener("webkitfullscreenchange", this.solveScreenChange);
    document.removeEventListener("mozfullscreenchange", this.solveScreenChange);
    document.removeEventListener("MSFullscreenChange", this.solveScreenChange);
  }

  setCustomImageHosting = () => {
    if (this.props.useImageHosting === undefined) {
      return;
    }
    const {url, name, isSmmsOpen, isQiniuyunOpen, isAliyunOpen} = this.props.useImageHosting;
    if (name) {
      this.props.imageHosting.setHostingUrl(url);
      this.props.imageHosting.setHostingName(name);
      this.props.imageHosting.addImageHosting(name);
    }
    if (isSmmsOpen) {
      this.props.imageHosting.addImageHosting(IMAGE_HOSTING_NAMES.smms);
    }
    if (isAliyunOpen) {
      this.props.imageHosting.addImageHosting(IMAGE_HOSTING_NAMES.aliyun);
    }
    if (isQiniuyunOpen) {
      this.props.imageHosting.addImageHosting(IMAGE_HOSTING_NAMES.qiniuyun);
    }

    // 第一次进入没有默认图床时
    if (window.localStorage.getItem(IMAGE_HOSTING_TYPE) === null) {
      let type;
      if (name) {
        type = name;
      } else if (isSmmsOpen) {
        type = IMAGE_HOSTING_NAMES.smms;
      } else if (isAliyunOpen) {
        type = IMAGE_HOSTING_NAMES.aliyun;
      } else if (isQiniuyunOpen) {
        type = IMAGE_HOSTING_NAMES.qiniuyun;
      }
      this.props.imageHosting.setType(type);
      window.localStorage.setItem(IMAGE_HOSTING_TYPE, type);
    }
  };

  setEditorContent = () => {
    const {defaultText} = this.props;
    if (defaultText) {
      this.props.content.setContent(defaultText);
    }
  };

  setCurrentIndex(index) {
    this.index = index;
  }

  solveScreenChange = () => {
    const {isImmersiveEditing} = this.props.view;
    this.props.view.setImmersiveEditing(!isImmersiveEditing);
  };

  getInstance = (instance) => {
    if (instance) {
      this.props.content.setMarkdownEditor(instance.editor);
    }
  };

  handleScroll = () => {
    if (this.props.navbar.isSyncScroll) {
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

  addContainer(math, doc) {
    const tag = "span";
    const spanClass = math.display ? "span-block-equation" : "span-inline-equation";
    const cls = math.display ? "block-equation" : "inline-equation";
    math.typesetRoot.className = cls;
    math.typesetRoot.setAttribute(MJX_DATA_FORMULA, math.math);
    math.typesetRoot.setAttribute(MJX_DATA_FORMULA_TYPE, cls);
    math.typesetRoot = doc.adaptor.node(tag, {class: spanClass, style: "cursor:pointer"}, [math.typesetRoot]);
  }

  render() {
    const {codeNum, previewType} = this.props.navbar;
    const {isEditAreaOpen, isPreviewAreaOpen, isStyleEditorOpen, isImmersiveEditing} = this.props.view;
    const {isSearchOpen} = this.props.dialog;

    const parseHtml =
      codeNum === 0
        ? markdownParserWechat.render(this.props.content.content)
        : markdownParser.render(this.props.content.content);

    const mdEditingClass = classnames({
      "nice-md-editing": !isImmersiveEditing,
      "nice-md-editing-immersive": isImmersiveEditing,
      "nice-md-editing-hide": !isEditAreaOpen,
    });

    const styleEditingClass = classnames({
      "nice-style-editing": true,
      "nice-style-editing-hide": isImmersiveEditing,
    });

    const richTextClass = classnames({
      "nice-marked-text": true,
      "nice-marked-text-pc": previewType === "pc",
      "nice-marked-text-hide": isImmersiveEditing || !isPreviewAreaOpen,
    });

    const richTextBoxClass = classnames({
      "nice-wx-box": true,
      "nice-wx-box-pc": previewType === "pc",
    });

    const textContainerClass = classnames({
      "nice-text-container": !isImmersiveEditing,
      "nice-text-container-immersive": isImmersiveEditing,
    });

    return (
      <appContext.Consumer>
        {({defaultTitle}) => (
          <div className="App">
            <Navbar title={defaultTitle} />
            <div className={textContainerClass}>
              <div id="nice-md-editor" className={mdEditingClass} onMouseOver={(e) => this.setCurrentIndex(1, e)}>
                {isSearchOpen && <SearchBox />}
                <CodeMirror
                  value={this.props.content.content}
                  options={{
                    theme: "md-mirror",
                    keyMap: "sublime",
                    mode: "markdown",
                    lineWrapping: true,
                    lineNumbers: false,
                    extraKeys: {
                      ...bindHotkeys(this.props.content, this.props.dialog),
                      Tab: betterTab,
                      RightClick: rightClick,
                    },
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
              <div id="nice-rich-text" className={richTextClass} onMouseOver={(e) => this.setCurrentIndex(2, e)}>
                <Sidebar />
                <div
                  id={BOX_ID}
                  className={richTextBoxClass}
                  onScroll={this.handleScroll}
                  ref={(node) => {
                    this.previewContainer = node;
                  }}
                >
                  <section
                    id={LAYOUT_ID}
                    data-tool="mdnice编辑器"
                    data-website="https://www.mdnice.com"
                    dangerouslySetInnerHTML={{
                      __html: parseHtml,
                    }}
                    ref={(node) => {
                      this.previewWrap = node;
                    }}
                  />
                </div>
              </div>

              {isStyleEditorOpen && (
                <div id="nice-style-editor" className={styleEditingClass}>
                  <StyleEditor />
                </div>
              )}

              <Dialog />
              <EditorMenu />
            </div>
          </div>
        )}
      </appContext.Consumer>
    );
  }
}

export default App;
