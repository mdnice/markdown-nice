import React from "react";
import {observer, inject} from "mobx-react";
import {Input, Tooltip} from "antd";

import {ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";

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

  render() {
    return (
      <div
        data-active={this.props.dialog.isSearchOpen}
        data-replace={this.state.isReplaceOpen}
        className="mdnice-searchbox"
      >
        <div>
          <Tooltip placement="left" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="展开">
            <button
              className="searchbox-button searchbox-replace-toggle "
              type="button"
              onClick={() => this.setState((prevState) => ({isReplaceOpen: !prevState.isReplaceOpen}))}
            >
              <SvgIcon name="down" className="searchbox-icon" />
            </button>
          </Tooltip>
          <Input
            size="small"
            value={this.state.searchText}
            placeholder="按Enter进行查找"
            onChange={(e) => this.findContent(e.target.value)}
            onPressEnter={() => this.posChange(false)}
          />
          <span>
            <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="忽略大小写">
              <button type="button" className="searchbox-button" onClick={this.handleCaseFold}>
                <SvgIcon
                  name="fontCase"
                  className="searchbox-icon"
                  style={{height: 18, width: 18}}
                  fill={this.state.caseFold ? "#40a9ff" : undefined}
                />
              </button>
            </Tooltip>
            <button type="button" onClick={() => this.posChange(true)} className="searchbox-button">
              <SvgIcon name="down" className="searchbox-icon searchbox-icon-prev" />
            </button>
            <button type="button" onClick={() => this.posChange(false)} className="searchbox-button">
              <SvgIcon name="down" className="searchbox-icon" />
            </button>
            <button
              type="button"
              className="searchbox-button"
              onClick={() => {
                this.props.dialog.setSearchOpen(false);
                this.clearMarks();
              }}
            >
              <SvgIcon name="close" className="searchbox-icon" />
            </button>
          </span>
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
          <span>
            <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="替换">
              <button type="button" className="searchbox-button" onClick={this.replace}>
                <SvgIcon name="replace" className="searchbox-icon" style={{height: 16, width: 16}} />
              </button>
            </Tooltip>
            <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="全部替换">
              <button type="button" className="searchbox-button" onClick={this.replaceAll}>
                <SvgIcon name="replaceAll" className="searchbox-icon" style={{height: 16, width: 16}} />
              </button>
            </Tooltip>
          </span>
        </div>
      </div>
    );
  }
}

export default SearchBox;
