import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Modal } from "antd";

@inject("dialog")
@observer
class AboutDialog extends Component {
  handleOk = e => {
    this.props.dialog.setAboutOpen(false);
  };

  handleCancel = e => {
    this.props.dialog.setAboutOpen(false);
  };

  render() {
    return (
      <Modal
        title="关于"
        okText="确认"
        cancelText="取消"
        visible={this.props.dialog.isAboutOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
        bodyStyle={{
          paddingTop: "5px"
        }}
      >
        <h3 style={style.headerMargin}>Markdown Nice</h3>
        <p style={style.lineHeight}>一款 Markdown 微信排版工具；</p>
        <p style={style.lineHeight}>支持图片上传；</p>
        <p style={style.lineHeight}>支持代码样式；</p>
        <p style={style.lineHeight}>支持自定义样式；</p>
        <p style={style.lineHeight}>支持数学公式。</p>
        <h3 style={style.headerMargin}>我们</h3>
        <p style={style.lineHeight}>
          如果你喜欢我们的工具，欢迎关注
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/zhning12/markdown-nice"
          >
          &nbsp;GitHub&nbsp;
          </a>
           和新项目
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/guanpengchn/markdown-resume"
          >
            &nbsp;Markdown 简历
          </a>
          ，愿意
          <strong>微信打赏</strong>就更好啦。
        </p>
        <div style={{display: "flex",}}>
        <img
          alt="图片描述"
          style={style.imgWidth}
          src="https://i.loli.net/2019/03/31/5ca08c7d19872.png"
        />
        {/* <img
          alt="图片描述"
          style={style.imgWidth}
          src="https://i.loli.net/2019/03/31/5ca095dfa4714.png"
        /> */}
        </div>
      </Modal>
    );
  }
}

const style = {
  imgWidth: {
    width: "50%",
    height: "100%"
  },
  headerMargin: {
    marginTop: "5px",
    marginBottom: "5px"
  },
  lineHeight: {
    lineHeight: "26px",
    padding: 0
  }
};

export default AboutDialog;
