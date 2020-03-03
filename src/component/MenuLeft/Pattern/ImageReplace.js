import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import {imageReplace} from "../../../utils/editorKeyEvents";

import "../common.css";

@inject("content")
@observer
class ImageReplace extends Component {
  handleFormat = () => {
    const {content} = this.props.content;
    imageReplace(content, this.props.content);
  };

  render() {
    return (
      <div className="nice-menu-item" onClick={this.handleFormat}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">图片链接替换为图壳</span>
        </span>
      </div>
    );
  }
}

export default ImageReplace;
