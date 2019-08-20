import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Icon, Modal, Upload } from "antd";
import axios from "axios";
// import OSS from "ali-oss";

import { SM_MS_PROXY } from "../../utils/constant";

const Dragger = Upload.Dragger;

@inject("dialog")
@inject("content")
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

  // testOSS = form => {
  //   const client = new OSS({
  //     region: "oss-cn-hangzhou",
  //     //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
  //     accessKeyId: "LTAIzqm39B0rUg5l",
  //     accessKeySecret: "7DCr95Vbd7lR1dcOPHkcaXjSAVbmzJ",
  //     bucket: "draw-wechat"
  //   });

  //   client
  //     .put("object.jpg", form)
  //     .then(function(r1) {
  //       console.log("put success: %j", r1);
  //       // return client.get("object");
  //     })
  //     .catch(function(err) {
  //       console.error("error: %j", err);
  //     });
  // };

  // toBlob(urlData,fileType) {
  //   let bytes = window.atob(urlData);
  //   let n = bytes.length;
  //   let u8arr = new Uint8Array(n);
  //   while (n--) {
  //       u8arr[n] = bytes.charCodeAt(n);
  //   }
  //   return new Blob([u8arr], { type: fileType });
  // }

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
    // console.log(file);
    // formData.append("file", file);

    // const r = new FileReader();
    // r.readAsDataURL(file);
    // r.onload = e => {
    //   const urlData = e.target.result
    //   const base64 = urlData.split(',').pop();
    //   console.log(urlData)
    //   console.log(base64)
    //   // const base64 = urlData.split(',').pop();
    //   // const fileType = urlData.split(';').shift().split(':').pop();

    //   // const blob = this.toBlob(base64, fileType);
    //   // console.log(blob)

    //   const buffer = OSS.Buffer(base64);
    //   console.log(buffer)
    //   this.testOSS(buffer);
    // };

    // return;
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
        this.images.push(response.data);
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
          multiple={true}
          action={SM_MS_PROXY}
          customRequest={this.customRequest}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">点击或拖拽一张或多张照片上传</p>
          <p className="ant-upload-hint">感谢SM.MS图床助力</p>
        </Dragger>
      </Modal>
    );
  }
}

export default ImageDialog;
