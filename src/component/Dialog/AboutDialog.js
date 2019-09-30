import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal, Button} from "antd";

@inject("dialog")
@observer
class AboutDialog extends Component {
  handleOk = (e) => {
    this.props.dialog.setAboutOpen(false);
  };

  handleCancel = (e) => {
    this.props.dialog.setAboutOpen(false);
  };

  handleVersion = (e) => {
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
            href="https://github.com/zhning12/markdown-nice"
            style={style.noBorder}
          >
            <img alt="" style={style.img} src="https://badgen.net/github/stars/zhning12/markdown-nice" />
          </a>
        </h3>

        <p style={style.lineHeight}>支持自定义样式的 Markdown 编辑器；</p>
        <p style={style.lineHeight}>支持微信公众号排版；</p>
        <p style={style.lineHeight}>支持知乎、掘金、博客园和CSDN等平台；</p>
        <h3 style={style.headerMargin}>我们</h3>
        <p style={style.lineHeight}>
          如果你喜欢我们的工具，欢迎关注
          <a rel="noopener noreferrer" target="_blank" href="https://github.com/zhning12/markdown-nice">
            &nbsp;GitHub&nbsp;
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
          」，右下角扫一扫拉你入群，愿意
          <strong style={style.strong}>微信打赏</strong>
          就更好啦。
        </p>
        <div style={{display: "flex", alignItems: "center"}}>
          <img
            alt="图片描述"
            style={style.imgWidth}
            src="https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/%E6%89%93%E8%B5%8F%E4%BA%8C%E7%BB%B4%E7%A0%81_20190825201704.png"
          />
          <img
            alt="图片描述"
            style={style.imgWidth}
            src="https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/%E7%89%A7%E7%A0%81%E5%95%A6%E5%B0%8F%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81_20190929092055.JPG"
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
