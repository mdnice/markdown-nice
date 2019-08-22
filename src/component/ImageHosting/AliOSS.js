import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Form, Input } from "antd";
import { ALIOSS_IMAGE_HOSTING } from "../../utils/constant";

const formItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 16 }
  }
};

@inject("imageHosting")
@observer
class AliOSS extends Component {
  constructor(props) {
    super(props);
    // 从localstorage里面读取
    const imageHosting = JSON.parse(localStorage.getItem(ALIOSS_IMAGE_HOSTING));
    this.state = {
      imageHosting
    };
  }

  regionChange = e => {
    const { imageHosting } = this.state;
    imageHosting.region = e.target.value;
    this.setState({ imageHosting });
    localStorage.setItem(ALIOSS_IMAGE_HOSTING, JSON.stringify(imageHosting));
  };

  accessKeyIdChange = e => {
    const { imageHosting } = this.state;
    imageHosting.accessKeyId = e.target.value;
    this.setState({ imageHosting });
    localStorage.setItem(ALIOSS_IMAGE_HOSTING, JSON.stringify(imageHosting));
  };

  accessKeySecretChange = e => {
    const { imageHosting } = this.state;
    imageHosting.accessKeySecret = e.target.value;
    this.setState({ imageHosting });
    localStorage.setItem(ALIOSS_IMAGE_HOSTING, JSON.stringify(imageHosting));
  };

  bucketChange = e => {
    const { imageHosting } = this.state;
    imageHosting.bucket = e.target.value;
    this.setState({ imageHosting });
    localStorage.setItem(ALIOSS_IMAGE_HOSTING, JSON.stringify(imageHosting));
  };

  render() {
    const {
      region,
      accessKeyId,
      accessKeySecret,
      bucket
    } = this.state.imageHosting;
    return (
      <Form {...formItemLayout}>
        <Form.Item label="region" style={style.formItem}>
          <Input value={region} onChange={this.regionChange} />
        </Form.Item>
        <Form.Item label="accessKeyId" style={style.formItem}>
          <Input value={accessKeyId} onChange={this.accessKeyIdChange} />
        </Form.Item>
        <Form.Item label="accessKeySecret" style={style.formItem}>
          <Input
            value={accessKeySecret}
            onChange={this.accessKeySecretChange}
          />
        </Form.Item>
        <Form.Item label="bucket" style={style.formItem}>
          <Input value={bucket} onChange={this.bucketChange} />
        </Form.Item>
        <Form.Item label="提示" style={style.formItem}>
          <span>配置好图床信息后请在右上角进行切换</span>
        </Form.Item>
      </Form>
    );
  }
}

const style = {
  formItem: {
    marginBottom: "10px"
  }
};

export default AliOSS;
