import React from "react";
import {observer, inject} from "mobx-react";
import {Input} from "antd";

import SvgIcon from "../../icon";

import "./SearchBox.css";

@inject("content")
@inject("dialog")
@observer
class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replaceText: "",
      searchText: "",
      isReplaceOpen: false,
      cursor: null,
    };
  }

  clearMarks = () => {
    const {markdownEditor} = this.props.content;
    const markers = markdownEditor.getAllMarks();
    markers.forEach((marker) => marker.clear());
    const cursor = markdownEditor.getCursor();
    markdownEditor.setSelection(cursor);
  };

  findContent = (value) => {
    const {markdownEditor} = this.props.content;
    const cursor = markdownEditor.getSearchCursor(value, null, {caseFold: true});
    this.setState({searchText: value, cursor: cursor}, this.posNext);
  };

  // 高亮前需检测是否有匹配
  highlight = () => {
    const {markdownEditor} = this.props.content;
    const from = this.state.cursor.from();
    const to = this.state.cursor.to();

    markdownEditor.markText(from, to, {
      className: "searchbox-text-highlight",
    });
    markdownEditor.setSelection(from, to);
  };

  posNext = () => {
    this.clearMarks();
    if (this.state.searchText) {
      this.state.cursor.findNext();
      if (this.state.cursor.atOccurrence) {
        this.highlight();
      } else {
        while (this.state.cursor.findPrevious()) {
          /* 跳转到第一项，使之能够循环搜索 */
        }
        this.state.cursor.findNext();
        if (this.state.cursor.atOccurrence) {
          this.highlight();
        }
      }
    }
  };

  posPrev = () => {
    this.clearMarks();
    if (this.state.searchText) {
      this.state.cursor.findPrevious();
      if (this.state.cursor.atOccurrence) {
        this.highlight();
      } else {
        while (this.state.cursor.findNext()) {
          /* 跳转到末尾项，使之能够循环搜索 */
        }
        this.state.cursor.findPrevious();
        if (this.state.cursor.atOccurrence) {
          this.highlight();
        }
      }
    }
  };

  replace = () => {
    const {markdownEditor} = this.props.content;
    const selection = markdownEditor.getSelection();
    if (selection) {
      // 未选中不进行替换
      markdownEditor.replaceSelection(this.state.replaceText);
    }
    this.props.content.setContent(markdownEditor.getValue());
    this.posNext();
  };

  render() {
    return (
      <div data-active={this.props.dialog.isSearchOpen} className="mdnice-searchbox">
        <button
          className="searchbox-replace-toggle"
          type="button"
          onClick={() => this.setState((prevState) => ({isReplaceOpen: !prevState.isReplaceOpen}))}
          data-active={this.state.isReplaceOpen}
        >
          <SvgIcon name="down" className="searchbox-icon" />
        </button>
        <div data-active={this.state.isReplaceOpen} className="searchbox-input">
          <Input
            value={this.state.searchText}
            placeholder="查找"
            onChange={(e) => this.findContent(e.target.value)}
            onPressEnter={this.posNext}
          />
          <Input
            value={this.state.replaceText}
            placeholder="替换"
            onChange={(e) => {
              this.setState({replaceText: e.target.value});
            }}
            onPressEnter={this.replace}
          />
        </div>
        <button type="button" onClick={this.posPrev}>
          <SvgIcon name="down" className="searchbox-icon searchbox-icon-prev" />
        </button>
        <button type="button" onClick={this.posNext}>
          <SvgIcon name="down" className="searchbox-icon" />
        </button>
        <button
          type="button"
          onClick={() => {
            this.props.dialog.setSearchOpen(false);
            this.clearMarks();
          }}
        >
          <SvgIcon name="close" className="searchbox-icon" />
        </button>
      </div>
    );
  }
}

export default SearchBox;
