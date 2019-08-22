import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Icon, Modal, Upload, Tabs, Select } from "antd";
import axios from "axios";
import OSS from "ali-oss";

import AliOSS from "../ImageHosting/AliOSS";

import { toBlob } from "../../utils/helper";
import {
  SM_MS_PROXY,
  ALIOSS_IMAGE_HOSTING,
  IMAGE_HOSTING_TYPE,
  IMAGE_HOSTING_TYPE_OPTIONS
} from "../../utils/constant";

const Dragger = Upload.Dragger;
const { TabPane } = Tabs;
const { Option } = Select;

@inject("dialog")
@inject("content")
@inject("imageHosting")
@observer
class ImageDialog extends Component {
  constructor(props) {
    super(props);
    this.images = [];
  }

  // 确认后将内容更新到编辑器上
  handleOk = e => {
    let text = "";
    // 成功后添加url
    this.images.forEach(value => {
      text += `![${value.filename}](${value.url})\n`;
    });
    this.images = [];
    const { markdownEditor } = this.props.content;
    const cursor = markdownEditor.getCursor();
    markdownEditor.replaceSelection(text, cursor);
    // 上传后实时更新内容
    const content = markdownEditor.getValue();
    this.props.content.setContent(content);

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
    // 使用阿里云图床
    if (this.props.imageHosting.type === "阿里云") {
      const config = JSON.parse(window.localStorage.getItem(ALIOSS_IMAGE_HOSTING));
      this.aliOSSUpload(config, formData, file, onSuccess, onError);
    }
    // 使用SM.MS图床
    else {
      this.smmsUpload(
        formData,
        file,
        action,
        onProgress,
        onSuccess,
        onError,
        headers,
        withCredentials
      );
    }

    return {
      abort() {
        console.log("upload progress is aborted.");
      }
    };
  };

  smmsUpload = (
    formData,
    file,
    action,
    onProgress,
    onSuccess,
    onError,
    headers,
    withCredentials
  ) => {
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
        const image = {
          filename: response.data.filename,
          url: response.data.url
        }
        this.images.push(image);
        onSuccess(response, file);
      })
      .catch(onError);
  };

  aliOSSUpload = (config, formData, file, onSuccess, onError) => {
    formData.append("file", file);

    const base64Reader = new FileReader();
    base64Reader.readAsDataURL(file);
    base64Reader.onload = e => {
      const urlData = e.target.result;
      const base64 = urlData.split(",").pop();
      const fileType = urlData
        .split(";")
        .shift()
        .split(":")
        .pop();

      // base64转blob
      const blob = toBlob(base64, fileType);

      // blob转arrayBuffer
      const bufferReader = new FileReader();
      bufferReader.readAsArrayBuffer(blob);
      bufferReader.onload = event => {
        const buffer = new OSS.Buffer(event.target.result);
        this.aliOSSPutObject(config, file, buffer, onSuccess, onError);
      };
    };
  };

  aliOSSPutObject = (config, file, value, onSuccess, onError) => {
    const client = new OSS(config);

    client
      .put(file.name, value)
      .then(response => {
        console.log("put success: %j", response);
        // return client.get("object");
        const image = {
          filename: response.name,
          url: response.url
        }
        this.images.push(image);
        onSuccess(response, file);
      })
      .catch(onError);
  };

  typeChange = type => {
    this.props.imageHosting.setType(type);
    localStorage.setItem(IMAGE_HOSTING_TYPE, type);
  };

  render() {
    const columns = IMAGE_HOSTING_TYPE_OPTIONS.map((option, index) => (
      <Option key={index} value={option.value}>
        {option.label}
      </Option>
    ));
    const imageHostingSwitch = (
      <Select value={this.props.imageHosting.type} onChange={this.typeChange}>
        {columns}
      </Select>
    );
    return (
      <Modal
        title="本地上传"
        okText="确认"
        cancelText="取消"
        visible={this.props.dialog.isImageOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        bodyStyle={{ paddingTop: "10px" }}
      >
        <Tabs tabBarExtraContent={imageHostingSwitch} type="card">
          <TabPane tab="图片上传" key="1">
            <Dragger
              name="file"
              multiple={true}
              action={SM_MS_PROXY}
              customRequest={this.customRequest}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或拖拽一张或多张照片上传</p>
              <p className="ant-upload-hint">
                {"正在使用" + this.props.imageHosting.type + "图床"}
              </p>
            </Dragger>
          </TabPane>
          <TabPane tab="阿里云OSS" key="2">
            <AliOSS />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default ImageDialog;
