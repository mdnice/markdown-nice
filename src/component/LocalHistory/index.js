import * as React from "react";
import {Menu, Button, Radio} from "antd";
import CodeMirror from "@uiw/react-codemirror";
import MergeCodeMirror from "./mergeCodeMirror";
import {inject} from "mobx-react";

import "./localHistory.css";

const NOOP = () => {};
const prefix = "nice-md-local-history";

@inject("content")
class LocalHistory extends React.Component {
  constructor(props) {
    super(props);
    const {documents} = this.props;
    this.state = {
      content: documents[0].Content,
      selectedKeys: String(documents[0].id),
      mode: "all",
    };
  }

  selectNav = ({selectedKeys}) => {
    const {Content: content} = this.props.documents.find((doc) => String(doc.id) === String(selectedKeys[0])) || {};
    this.setState({
      content,
      selectedKeys,
    });
  };

  handleModeChange = (e) => {
    this.setState({
      mode: e.target.value,
    });
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
              <MergeCodeMirror
                key="local-history-diff"
                height="calc(100% - 56px)"
                className={`${prefix}-merge`}
                options={{
                  value: this.state.content,
                  origLeft: null,
                  orig: content,
                  lineNumbers: true,
                  theme: "md-mirror",
                  mode: "markdown",
                  highlightDifferences: true,
                  connect: "align",
                  collapseIdentical: false,
                }}
              />
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
