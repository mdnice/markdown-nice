import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, message, ConfigProvider} from "antd";

import {solveMath, solveHtml} from "../utils/converter";

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
    document.addEventListener("copy", this.copyListener);
    document.execCommand("copy");
    document.removeEventListener("copy", this.copyListener);
    this.setState({loading: false});
  };

  copyListener = (e) => {
    // 由于antd的message原因，有这行输出则每次都会进来，否则有问题，具体原因不明
    // console.log("clipboard");
    message.success("已复制，请到微信公众平台粘贴");
    e.clipboardData.setData("text/html", this.html);
    e.clipboardData.setData("text/plain", this.html);
    e.preventDefault();
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
