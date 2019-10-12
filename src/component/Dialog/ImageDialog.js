import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal, Upload, Tabs, Select} from "antd";

import SvgIcon from "../../icon";

import AliOSS from "../ImageHosting/AliOSS";
import QiniuOSS from "../ImageHosting/QiniuOSS";

import {uploadAdaptor} from "../../utils/imageHosting";
import {SM_MS_PROXY, IMAGE_HOSTING_TYPE, IMAGE_HOSTING_TYPE_OPTIONS} from "../../utils/constant";

const {Dragger} = Upload;
const {TabPane} = Tabs;
const {Option} = Select;

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
  handleOk = () => {
    let text = "";
    // 成功后添加url
    this.images.forEach((value) => {
      text += `![${value.filename}](${value.url})\n`;
    });
    this.images = [];
    const {markdownEditor} = this.props.content;
    const cursor = markdownEditor.getCursor();
    markdownEditor.replaceSelection(text, cursor);
    // 上传后实时更新内容
    const content = markdownEditor.getValue();
    this.props.content.setContent(content);

    this.props.dialog.setImageOpen(false);
  };

  handleCancel = () => {
    this.props.dialog.setImageOpen(false);
  };

  customRequest = ({action, data, file, headers, onError, onProgress, onSuccess, withCredentials}) => {
    const formData = new FormData();
    const {images} = this;
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    // 使用阿里云图床
    if (this.props.imageHosting.type === "阿里云") {
      // const configAli = JSON.parse(window.localStorage.getItem(ALIOSS_IMAGE_HOSTING));
      uploadAdaptor({file, onSuccess, onError, images});
    }
    // 使用七牛云图床
    else if (this.props.imageHosting.type === "七牛云") {
      // const config = JSON.parse(window.localStorage.getItem(QINIUOSS_IMAGE_HOSTING));
      uploadAdaptor({file, onSuccess, onError, onProgress, images});
    }
    // 使用mdnice七牛云免费图床
    else if (this.props.imageHosting.type === "mdnice") {
      uploadAdaptor({formData, file, onSuccess, onError, images});
      // this.qiniuFreeUpload(formData, file, onSuccess, onError);
    }
    // 使用SM.MS图床
    else {
      uploadAdaptor({formData, file, action, onProgress, onSuccess, onError, headers, withCredentials});
      // this.smmsUpload(formData, file, action, onProgress, onSuccess, onError, headers, withCredentials);
    }

    return {
      abort() {
        console.log("upload progress is aborted.");
      },
    };
  };

  // // 阿里云对象存储上传
  // aliOSSUpload = (config, file, onSuccess, onError) => {
  //   const base64Reader = new FileReader();
  //   base64Reader.readAsDataURL(file);
  //   base64Reader.onload = (e) => {
  //     const urlData = e.target.result;
  //     const base64 = urlData.split(",").pop();
  //     const fileType = urlData
  //       .split(";")
  //       .shift()
  //       .split(":")
  //       .pop();

  //     // base64转blob
  //     const blob = toBlob(base64, fileType);

  //     // blob转arrayBuffer
  //     const bufferReader = new FileReader();
  //     bufferReader.readAsArrayBuffer(blob);
  //     bufferReader.onload = (event) => {
  //       const buffer = new OSS.Buffer(event.target.result);
  //       this.aliOSSPutObject(config, file, buffer, onSuccess, onError);
  //     };
  //   };
  // };

  // 阿里云对象存储上传
  // aliOSSPutObject = (config, file, value, onSuccess, onError) => {
  //   let client;
  //   try {
  //     client = new OSS(config);
  //   } catch (error) {
  //     message.error("OSS配置错误，请根据文档检查配置项");
  //     return;
  //   }

  //   const OSSName = getOSSName(file.name);

  //   client
  //     .put(OSSName, value)
  //     .then((response) => {
  //       const names = file.name.split(".");
  //       names.pop();
  //       const filename = names.join(".");
  //       const image = {
  //         filename, // 名字不变并且去掉后缀
  //         url: response.url,
  //       };
  //       this.images.push(image);
  //       onSuccess(response, file);
  //     })
  //     .catch((error) => {
  //       message.error("请根据文档检查配置项");
  //       onError(error, error.toString());
  //     });
  // };

  typeChange = (type) => {
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
    const {type} = this.props.imageHosting;

    return (
      <Modal
        title="本地上传"
        okText="确认"
        cancelText="取消"
        visible={this.props.dialog.isImageOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        bodyStyle={{paddingTop: "10px"}}
      >
        <Tabs tabBarExtraContent={imageHostingSwitch} type="card">
          <TabPane tab="图片上传" key="1">
            <Dragger name="file" multiple action={SM_MS_PROXY} customRequest={this.customRequest}>
              <p className="ant-upload-drag-icon">
                <SvgIcon name="inbox" style={style.svgIcon} fill="#40a9ff" />
              </p>
              <p className="ant-upload-text">点击或拖拽一张或多张照片上传</p>
              <p className="ant-upload-hint">{"正在使用" + type + "图床"}</p>
            </Dragger>
          </TabPane>
          <TabPane tab="阿里云" key="2">
            <AliOSS />
          </TabPane>
          <TabPane tab="七牛云" key="3">
            <QiniuOSS />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

const style = {
  svgIcon: {
    width: "48px",
    height: "48px",
  },
};

export default ImageDialog;
