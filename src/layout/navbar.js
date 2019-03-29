import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Upload, Button, Icon, Input, Tooltip, Modal } from "antd";
import axios from "axios";
// import delIcon from "../icon/del.svg";
// import boldIcon from "../icon/bold.svg";
// import italicIcon from "../icon/italic.svg";
// import linkIcon from "../icon/link.svg";
import imageIcon from "../icon/image.svg";
// import codeIcon from "../icon/code1.svg";

import "./Navbar.css";
import FullScreen from "../component/FullScreen";
import ThemeSelect from "../component/ThemeSelect";
// import CopyBtn from "../component/CopyBtn";
import LogIn from "../component/LogIn";
import { ENTER_DELAY, LEAVE_DELAY, SM_MS_PROXY } from "../utils/constant";

const ButtonGroup = Button.Group;
const Dragger = Upload.Dragger;

@inject("title")
@inject("content")
@observer
class Navbar extends Component {
  state = { visible: false };

  changeTitle = event => {
    this.props.title.setTitle(event.target.value);
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    // console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false
    });
  };

  customRequest = ({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials
  }) => {
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    // SM.MS图床必须这里命名为smfile
    formData.append("smfile", file);
    axios
      .post(action, formData, {
        withCredentials,
        headers,
        onUploadProgress: ({ total, loaded }) => {
          onProgress(
            {
              percent: parseInt(Math.round((loaded / total) * 100).toFixed(2))
            },
            file
          );
        }
      })
      .then(({ data: response }) => {
        // 成功后直接添加url
        const { content } = this.props.content;
        this.props.content.setContent(`![](${response.data.url})\n${content}`);
        this.setState({ visible: false });
        onSuccess(response, file);
      })
      .catch(onError);

    return {
      abort() {
        console.log("upload progress is aborted.");
      }
    };
  };

  render() {
    return (
      <div className="nav-bar">
        <Modal
          title="本地上传"
          okText="确认"
          cancelText="取消"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Dragger
            name="file"
            // multiple: true,
            action={SM_MS_PROXY}
            customRequest={this.customRequest}
          >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或拖拽一张照片上传</p>
            <p className="ant-upload-hint">感谢SM.MS图床助力</p>
          </Dragger>
        </Modal>
        <div className="left-nav">
          <div className="title-container">
            <Input
              placeholder="标题"
              allowClear
              style={{ margin: 8 }}
              value={this.props.title.title}
              onChange={this.changeTitle}
            />
          </div>
          <ButtonGroup>
            {/* <Tooltip
              placement="bottom"
              mouseEnterDelay={ENTER_DELAY}
              mouseLeaveDelay={LEAVE_DELAY}
              title="删除线"
            >
              <Button className="btn-padding">
                <Icon component={delIcon} className="icon-size" />
              </Button>
            </Tooltip>
            <Tooltip
              placement="bottom"
              mouseEnterDelay={ENTER_DELAY}
              mouseLeaveDelay={LEAVE_DELAY}
              title="加粗"
            >
              <Button className="btn-padding">
                <Icon component={boldIcon} className="icon-size" />
              </Button>
            </Tooltip>
            <Tooltip
              placement="bottom"
              mouseEnterDelay={ENTER_DELAY}
              mouseLeaveDelay={LEAVE_DELAY}
              title="斜体"
            />
            <Button className="btn-padding">
              <Icon component={italicIcon} className="icon-size" />
            </Button>
            <Tooltip
              placement="bottom"
              mouseEnterDelay={ENTER_DELAY}
              mouseLeaveDelay={LEAVE_DELAY}
              title="代码块"
            >
              <Button className="btn-padding">
                <Icon component={codeIcon} className="icon-size" />
              </Button>
            </Tooltip>
            <Tooltip
              placement="bottom"
              mouseEnterDelay={ENTER_DELAY}
              mouseLeaveDelay={LEAVE_DELAY}
              title="链接"
            >
              <Button className="btn-padding">
                <Icon component={linkIcon} className="icon-size" />
              </Button>
            </Tooltip> */}
            <Tooltip
              placement="bottom"
              mouseEnterDelay={ENTER_DELAY}
              mouseLeaveDelay={LEAVE_DELAY}
              title="图片"
            >
              <Button className="btn-padding" onClick={this.showModal}>
                <Icon component={imageIcon} className="icon-size" />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </div>
        <div className="right-nav">
          <ThemeSelect />
          {/* <Save /> */}
          <FullScreen />
          <LogIn />
        </div>
      </div>
    );
  }
}

export default Navbar;
