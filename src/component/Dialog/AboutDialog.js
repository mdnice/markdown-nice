import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal, Button} from "antd";

@inject("dialog")
@observer
class AboutDialog extends Component {
  handleOk = () => {
    this.props.dialog.setAboutOpen(false);
  };

  handleCancel = () => {
    this.props.dialog.setAboutOpen(false);
  };

  handleVersion = () => {
    this.props.dialog.setAboutOpen(false);
    this.props.dialog.setVersionOpen(true);
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
        footer={[
          <Button key="version" onClick={this.handleVersion}>
            更新记录
          </Button>,
          <Button key="submit" type="primary" onClick={this.handleOk}>
            确认
          </Button>,
        ]}
        bodyStyle={{
          paddingTop: "5px",
        }}
      >
        <h3 style={style.headerMargin}>
          Markdown Nice
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/mdnice/markdown-nice"
            style={style.noBorder}
          >
            <img alt="" style={style.img} src="https://badgen.net/github/stars/mdnice/markdown-nice" />
          </a>
        </h3>

        <p style={style.lineHeight}>支持自定义样式的 Markdown 编辑器；</p>
        <p style={style.lineHeight}>支持微信公众号排版；</p>
        <p style={style.lineHeight}>支持开源中国、知乎、掘金、博客园和CSDN等平台；</p>
        <h3 style={style.headerMargin}>我们</h3>
        <p style={style.lineHeight}>
          如果你喜欢我们的工具，欢迎关注
          <a rel="noopener noreferrer" target="_blank" href="https://github.com/mdnice/markdown-nice">
            &nbsp;GitHub&nbsp;
          </a>
          、
          <a rel="noopener noreferrer" target="_blank" href="https://gitee.com/zhning12/markdown-nice">
            &nbsp;Gitee&nbsp;
          </a>
          和新项目
          <a
            style={style.a}
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/guanpengchn/markdown-resume"
          >
            &nbsp;Markdown 简历
          </a>
          ，同时我们也组建了「
          <strong style={style.strong}>微信群</strong>
          」，右下角关注公众号回复「排版」拉你入群，愿意
          <strong style={style.strong}>微信打赏</strong>
          就更好啦。
        </p>
        <div style={{display: "flex", alignItems: "center"}}>
          <img
            alt="图片描述"
            style={style.imgWidth}
            src="https://my-wechat.mdnice.com/mdnice/bonus_20191007150639.png"
          />
          <img
            alt="图片描述"
            style={style.imgWidth}
            src="https://my-wechat.mdnice.com/wechat/wechat_gongzhognhao_20191014013348.gif"
          />
        </div>
      </Modal>
    );
  }
}

const style = {
  imgWidth: {
    width: "50%",
    height: "100%",
  },
  headerMargin: {
    marginTop: "5px",
    marginBottom: "5px",
    color: "black",
  },
  lineHeight: {
    lineHeight: "26px",
    color: "black",
    padding: 0,
    margin: 0,
  },
  img: {
    width: "70px",
    marginLeft: "10px",
    display: "inline-block",
  },
  noBorder: {
    border: "none",
  },
};

export default AboutDialog;
