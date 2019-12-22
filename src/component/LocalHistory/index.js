import * as React from "react";
import {Menu, Button} from "antd";
import CodeMirror from "@uiw/react-codemirror";
import "./localHistory.css";

const NOOP = () => {};
const prefix = "nice-md-local-history";

class LocalHistory extends React.Component {
  constructor(props) {
    super(props);
    const {documents} = this.props;
    this.state = {
      content: documents[0].Content,
      selectedKeys: String(documents[0].id),
    };
  }

  selectNav = ({selectedKeys}) => {
    const {Content: content} = this.props.documents.find((doc) => String(doc.id) === String(selectedKeys[0])) || {};
    this.setState({
      content,
      selectedKeys,
    });
  };

  render() {
    const {documents} = this.props;

    return (
      <>
        <Menu className={`${prefix}-nav`} onSelect={this.selectNav} selectedKeys={this.state.selectedKeys}>
          {documents.map((d) => (
            <Menu.Item key={d.id}>{d.SaveTime.toLocaleString()}</Menu.Item>
          ))}
        </Menu>
        {this.state.content && (
          <div className={`${prefix}-preview`}>
            <CodeMirror
              key="local-history"
              value={this.state.content}
              height="calc(100% - 56px)"
              options={{
                readOnly: true,
                theme: "md-mirror",
                mode: "markdown",
                lineWrapping: true,
                lineNumbers: true,
              }}
            />
            <div className={`${prefix}-btn-group`}>
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
