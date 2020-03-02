import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal, Timeline, Button} from "antd";
import axios from "axios";
import {packageVersion} from "../../utils/helper";
import {NEWEST_VERSION} from "../../utils/constant";
import SvgIcon from "../../icon";

@inject("dialog")
@observer
class VersionDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      versionNum: 0,
      versionTimeline: [],
      recommend: null,
      specialInfo: "",
    };
  }

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

  componentDidMount = async () => {
    try {
      const {data} = await axios.get("https://api.mdnice.com/versions/newest");
      const newestVersion = localStorage.getItem(NEWEST_VERSION);
      if (newestVersion !== data.version) {
        localStorage.setItem(NEWEST_VERSION, data.version);
        if (data.version !== packageVersion) {
          this.props.dialog.setVersionOpen(true);
        }
      } else if (newestVersion !== packageVersion) {
        this.props.dialog.setVersionOpen(true);
      }
      this.setState({...data});
    } catch (err) {
      console.error("读取最新Mdnice版本信息错误");
    }
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
          {/* {VERSION_TIMELINE.map((version, index) => {
            if (index === 0) {
              return (
                <Timeline.Item key={index} dot={<SvgIcon name="environment" style={style.svgIcon} />}>
                  <strong>{version}</strong>
                </Timeline.Item>
              );
            } else {
              return <Timeline.Item key={index}>{version}</Timeline.Item>;
            }
          })} */}
          {this.state.versionTimeline.map((version, index) => {
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
          {this.state.recommend && (
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
                // href="https://docs.mdnice.com/#/beta"
                href={this.state.recommend.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {/* Markdown Nice浏览器插件进入Beta阶段🎉🎉🎉，欢迎使用，排版效果更优！ */}
                {this.state.recommend.maininfo}
              </a>
            </Timeline.Item>
          )}
        </Timeline>
        <div dangerouslySetInnerHTML={{__html: this.state.specialInfo}} />
        {/* <video style={{width: "100%"}} controls autoPlay>
          <source src="https://imgkr.cn-bj.ufileos.com/4d624bd6-13f6-4956-a58a-0b77763a9784.mov" type="video/mp4" />
          <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
        </video> */}
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
