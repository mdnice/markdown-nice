import React from "react";
import {observer, inject} from "mobx-react";
import {Input, Tooltip} from "antd";

import {ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";

import SvgIcon from "../../icon";

import "./SearchBox.css";

function WrappedButton(props) {
  const className = props.className === undefined ? "" : props.className;
  return (
    <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title={props.tipText}>
      <button className="searchbox-button" type="button" onClick={props.onClick}>
        <SvgIcon name={props.icon} className={`searchbox-icon ${className}`} fill={props.fill} />
      </button>
    </Tooltip>
  );
}

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
      caseFold: true,
    };
  }

  /** false means next, true means previous */
  posChange = (direction) => {
    this.clearMarks();
    if (typeof direction !== "boolean") {
      return;
    }
    if (this.state.searchText && this.state.cursor) {
      this.state.cursor.find(direction);
      if (this.state.cursor.atOccurrence) {
        this.highlight();
      } else {
        while (this.state.cursor.find(!direction)) {
          //  从头开始寻找
        }
        this.state.cursor.find(direction);
        this.highlight();
      }
    }
  };

  handleCaseFold = () => {
    const {markdownEditor} = this.props.content;
    this.clearMarks();
    this.setState(
      (prevState) => {
        const caseFold = !prevState.caseFold;
        const cursor = prevState.searchText
          ? markdownEditor.getSearchCursor(prevState.searchText, null, {caseFold: caseFold})
          : null;
        return {caseFold: caseFold, cursor: cursor};
      },
      () => this.posChange(false),
    );
  };

  componentDidUpdate = () => {
    if (this.props.dialog && !this.props.dialog.isSearchOpen) {
      if (this.state.isReplaceOpen) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          isReplaceOpen: false,
        });
      }
    }
  };

  clearMarks = () => {
    const {markdownEditor} = this.props.content;
    // const markers = markdownEditor.getAllMarks();
    // markers.forEach((marker) => marker.clear());
    const cursor = markdownEditor.getCursor();
    markdownEditor.setSelection(cursor);
  };

  findContent = (value) => {
    const {markdownEditor} = this.props.content;
    this.setState(
      (prevState) => {
        const cursor = value ? markdownEditor.getSearchCursor(value, null, {caseFold: prevState.caseFold}) : null;
        return {searchText: value, cursor: cursor};
      },
      () => this.posChange(false),
    );
  };

  highlight = () => {
    // 高亮前需检测是否有匹配
    if (this.state.cursor.atOccurrence) {
      const {markdownEditor} = this.props.content;
      const from = this.state.cursor.from();
      const to = this.state.cursor.to();

      // markdownEditor.markText(from, to, {
      //   className: "searchbox-text-highlight",
      // });
      markdownEditor.setSelection(from, to);
      // 防止搜索框挡住文字
      markdownEditor.scrollIntoView(from, 100);
    }
  };

  replace = () => {
    const {markdownEditor} = this.props.content;
    const selection = markdownEditor.getSelection();
    if (selection) {
      // 未选中不进行替换
      markdownEditor.replaceSelection(this.state.replaceText);

      const content = markdownEditor.getValue();
      this.props.content.setContent(content);
      this.posChange(false);
    }
  };

  replaceAll = () => {
    const {markdownEditor} = this.props.content;
    const selection = markdownEditor.getSelection();
    if (selection && this.state.searchText) {
      const content = markdownEditor.getValue();
      const searchReg = new RegExp(this.state.searchText, "g");
      const replaced = content.replace(searchReg, this.state.replaceText);

      this.props.content.setContent(replaced);
    }
  };

  handelFoldClick = () => {
    this.setState((prevState) => ({isReplaceOpen: !prevState.isReplaceOpen}));
  };

  handleClose = () => {
    this.props.dialog.setSearchOpen(false);
    this.clearMarks();
  };

  render() {
    return (
      <div
        data-active={this.props.dialog.isSearchOpen}
        data-replace={this.state.isReplaceOpen}
        className="mdnice-searchbox"
      >
        <div>
          <WrappedButton icon="down" tipText="展开" onClick={this.handelFoldClick} className="searchbox-icon-fold" />
          <Input
            size="small"
            value={this.state.searchText}
            placeholder="按Enter进行查找"
            onChange={(e) => this.findContent(e.target.value)}
            onPressEnter={() => this.posChange(false)}
          />
          <WrappedButton
            icon="fontCase"
            onClick={this.handleCaseFold}
            tipText="忽略大小写"
            className="searchbox-icon-casefold"
            fill={this.state.caseFold ? "#40a9ff" : undefined}
          />
          <WrappedButton
            icon="down"
            className="searchbox-icon-prev"
            onClick={() => this.posChange(true)}
            tipText="上一个"
          />
          <WrappedButton icon="down" onClick={() => this.posChange(false)} tipText="下一个" />
          <WrappedButton icon="close" onClick={this.handleClose} tipText="关闭" />
        </div>
        <div>
          <Input
            size="small"
            value={this.state.replaceText}
            placeholder="按Enter进行替换"
            onChange={(e) => {
              this.setState({replaceText: e.target.value});
            }}
            onPressEnter={this.replace}
          />
          <WrappedButton icon="replace" className="searchbox-icon-replace" onClick={this.replace} tipText="替换" />
          <WrappedButton
            icon="replaceAll"
            className="searchbox-icon-replace"
            onClick={this.replaceAll}
            tipText="替换所有"
          />
        </div>
      </div>
    );
  }
}

export default SearchBox;
