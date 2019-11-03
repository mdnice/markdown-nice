import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, message, ConfigProvider} from "antd";

import {solveMath, solveHtml, copySafari} from "../utils/converter";

@inject("content")
@inject("navbar")
@inject("imageHosting")
@inject("dialog")
@observer
class Copy extends Component {
  constructor(props) {
    super(props);
    this.html = "";
    this.state = {
      loading: false,
    };
  }

  copy = () => {
    this.setState({loading: true});
    solveMath();
    this.html = solveHtml();
    // FIXED: safari 复制问题
    copySafari(this.html);
    message.success("已复制，请到微信公众平台粘贴");
    this.setState({loading: false});
  };

  render() {
    return (
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Button type="primary" style={style.btnHeight} onClick={this.copy} loading={this.state.loading}>
          复制
        </Button>
      </ConfigProvider>
    );
  }
}

const style = {
  btnHeight: {
    height: "30px",
  },
  mathNotify: {
    padding: 0,
    fontSize: "14px",
    lineHeight: "20px",
    color: "rgba(0,0,0,0.65)",
  },
  close: {
    padding: 0,
  },
};

export default Copy;
