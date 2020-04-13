import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {wordCalc} from "../utils/helper";

import "./Footer.css";

@inject("content")
@inject("navbar")
@observer
class Footer extends Component {
  render() {
    const {content, themeList} = this.props.content;
    const {templateNum} = this.props.navbar;

    const lineCount = content.split("\n").length;
    const wordCount = wordCalc(content);
    const themeName = themeList[templateNum].name;
    return (
      <div className="nice-footer-container">
        <p>
          行数：
          {lineCount}
        </p>
        <p>
          字数：
          {wordCount}
        </p>
        <p>
          主题：
          {themeName}
        </p>
      </div>
    );
  }
}

export default Footer;
