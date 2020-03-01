import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal, Timeline, Button} from "antd";
import {VERSION_TIMELINE} from "../../utils/constant";
import SvgIcon from "../../icon";

@inject("dialog")
@observer
class VersionDialog extends Component {
  handleOk = () => {
    this.props.dialog.setVersionOpen(false);
  };

  handleCancel = () => {
    this.props.dialog.setVersionOpen(false);
  };

  handleMore = () => {
    const w = window.open("about:blank");
    w.location.href = "https://github.com/mdnice/markdown-nice/blob/master/CHANGELOG.md";
  };

  handleDocs = () => {
    const w = window.open("about:blank");
    w.location.href = "https://docs.mdnice.com";
  };

  render() {
    return (
      <Modal
        title="版本更新"
        visible={this.props.dialog.isVersionOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={this.handleOk}>
            确认
          </Button>,
        ]}
        destroyOnClose
      >
        <Timeline>
          {VERSION_TIMELINE.map((version, index) => {
            if (index === 0) {
              return (
                <Timeline.Item key={index} dot={<SvgIcon name="environment" style={style.svgIcon} />}>
                  <strong>{version}</strong>
                </Timeline.Item>
              );
            } else {
              return <Timeline.Item key={index}>{version}</Timeline.Item>;
            }
          })}
          <Timeline.Item>
            了解更多，请查看
            <a
              style={{fontWeight: "bold"}}
              alt=""
              href="https://docs.mdnice.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              用户与开发者文档
            </a>
          </Timeline.Item>
          <Timeline.Item dot={<SvgIcon name="more" style={style.svgIcon} />}>
            {/* <a
              style={{fontWeight: "bold", borderBottom: "double"}}
              alt=""
              href="https://github.com/mdnice/sitdown"
              rel="noopener noreferrer"
              target="_blank"
            >
              感谢「林风」贡献的 SitDown（html 转 markdown 神器），欢迎点击 Star
            </a> */}
            <a
              style={{fontWeight: "bold", borderBottom: "double"}}
              alt=""
              href="https://docs.mdnice.com/#/beta"
              rel="noopener noreferrer"
              target="_blank"
            >
              Markdown Nice浏览器插件进入Beta阶段🎉🎉🎉，欢迎使用，排版效果更优！
            </a>
          </Timeline.Item>
        </Timeline>
        <video style={{width: "100%"}} controls>
          <source src="https://imgkr.cn-bj.ufileos.com/e269a7aa-ba4b-42f9-b2bf-c15e0632400e.mov" type="video/mp4" />
          <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
        </video>
      </Modal>
    );
  }
}

const style = {
  svgIcon: {
    width: "16px",
    height: "16px",
  },
};

export default VersionDialog;
