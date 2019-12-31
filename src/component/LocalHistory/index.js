import * as React from "react";
import {Menu, Button, Radio} from "antd";
import CodeMirror from "@uiw/react-codemirror";
import {diff_match_patch as DiffMatchPath} from "diff-match-patch";
// import MergeCodeMirror from "./mergeCodeMirror";
import {inject} from "mobx-react";

import "./localHistory.css";

const NOOP = () => {};
const prefix = "nice-md-local-history";

const diff = new DiffMatchPath();
@inject("content")
class LocalHistory extends React.Component {
  constructor(props) {
    super(props);
    const {documents} = this.props;
    this.state = {
      content: documents[0].Content,
      diffHtml: "",
      selectedKeys: String(documents[0].id),
      mode: "all",
    };
  }

  getDiffHtml = (content, history) => {
    // eslint-disable-next-line no-underscore-dangle
    var a = diff.diff_linesToChars_(content, history);
    var lineText1 = a.chars1;
    var lineText2 = a.chars2;
    var diffs = diff.diff_main(lineText1, lineText2, false);
    // eslint-disable-next-line no-underscore-dangle
    diff.diff_charsToLines_(diffs, a.lineArray);
    return diff.diff_prettyHtml(diffs).replace(/&para;/g, "");
  };

  selectNav = ({selectedKeys}) => {
    const {Content: content} = this.props.documents.find((doc) => String(doc.id) === String(selectedKeys[0])) || {};
    this.setState({
      content,
      selectedKeys,
      diffHtml: this.getDiffHtml(content, this.props.content),
    });
  };

  handleModeChange = async (e) => {
    const {content} = this.props;
    this.setState((preState) => ({
      mode: e.target.value,
      diffHtml: e.target.value === "diff" ? this.getDiffHtml(preState.content, content) : preState.diffHtml,
    }));
  };

  render() {
    const {documents, content} = this.props;

    return (
      <>
        <Menu className={`${prefix}-nav`} onSelect={this.selectNav} selectedKeys={this.state.selectedKeys}>
          {documents.map((d) => (
            <Menu.Item key={d.id}>{d.SaveTime.toLocaleString()}</Menu.Item>
          ))}
        </Menu>
        {this.state.content && (
          <div className={`${prefix}-preview`}>
            {this.state.mode === "all" ? (
              <CodeMirror
                key="local-history"
                value={this.state.content}
                height="calc(100% - 56px)"
                options={{
                  readOnly: true,
                  theme: "md-mirror",
                  mode: "markdown",
                  lineWrapping: true,
                  lineNumbers: false,
                }}
              />
            ) : (
              // <MergeCodeMirror
              //   key="local-history-diff"
              //   height="calc(100% - 56px)"
              //   className={`${prefix}-merge`}
              //   options={{
              //     value: this.state.content,
              //     origLeft: null,
              //     orig: content,
              //     lineNumbers: true,
              //     theme: "md-mirror",
              //     mode: "markdown",
              //     highlightDifferences: true,
              //     connect: "align",
              //     collapseIdentical: false,
              //     readOnly: true,
              //   }}
              // />
              <div dangerouslySetInnerHTML={{__html: this.state.diffHtml}} className={`${prefix}-diff-content`} />
            )}
            <div className={`${prefix}-btn-group`}>
              <Radio.Group onChange={this.handleModeChange} value={this.state.mode}>
                <Radio value="all">全文</Radio>
                <Radio value="diff">和当前内容对比</Radio>
              </Radio.Group>
              <div>
                <Button onClick={this.props.onCancel}>取消</Button>
                <Button
                  type="primary"
                  onClick={() => {
                    this.props.onEdit(this.state.content);
                  }}
                >
                  恢复此版本
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

LocalHistory.defaultProps = {
  visible: false,
  document: [{}],
  onEdit: NOOP,
  onCancel: NOOP,
};

export default LocalHistory;
