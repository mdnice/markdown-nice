import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Icon, Modal, Upload } from "antd";
import axios from "axios";

import { SM_MS_PROXY } from "../../utils/constant";

const Dragger = Upload.Dragger;

@inject("dialog")
@inject("content")
@observer
class ImageDialog extends Component {
  handleOk = e => {
    this.props.dialog.setImageOpen(false);
  };

  handleCancel = e => {
    this.props.dialog.setImageOpen(false);
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
        this.props.dialog.setImageOpen(false);
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
      <Modal
        title="本地上传"
        okText="确认"
        cancelText="取消"
        visible={this.props.dialog.isImageOpen}
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
    );
  }
}

export default ImageDialog;
