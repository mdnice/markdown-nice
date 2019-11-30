import * as React from "react";
import {Button} from "antd";
import PreviewForm from "./preview";
import "./localHistory.css";

const NOOP = () => {};
class LocalHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreview: false,
      markDownString: "",
    };
  }

  preview = (content) => {
    this.setState({
      showPreview: true,
      markDownString: content,
    });
  };

  hidePreview = () => {
    this.setState({
      showPreview: false,
      markDownString: "",
    });
  };

  render() {
    const {documents} = this.props;
    return (
      <>
        {documents.map((d) => (
          <div key={d.id}>
            {/* 保存时间：{moment(d.SaveTime).format('YYYY-MM-DD HH:mm:ss')} */}
            保存时间：
            {d.SaveTime.toLocaleString()}
            <Button
              type="primary"
              onClick={() => {
                this.preview(d.Content);
              }}
            >
              预览
            </Button>
            <Button
              onClick={() => {
                this.props.onEdit(d.Content);
              }}
            >
              编辑
            </Button>
            <PreviewForm
              hideModal={this.hidePreview}
              visible={this.state.showPreview}
              markDownString={this.state.markDownString}
            />
          </div>
        ))}
      </>
    );
  }
}

LocalHistory.defaultProps = {
  visible: false,
  document: [],
  onEdit: NOOP,
};

export default LocalHistory;
