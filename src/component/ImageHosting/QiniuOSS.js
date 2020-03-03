import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Input, Select, Form} from "antd";
import {QINIUOSS_IMAGE_HOSTING} from "../../utils/constant";

const {Option} = Select;
const formItemLayout = {
  labelCol: {
    xs: {span: 6},
  },
  wrapperCol: {
    xs: {span: 16},
  },
};

@inject("imageHosting")
@observer
class QiniuOSS extends Component {
  constructor(props) {
    super(props);
    // 从localstorage里面读取
    const imageHosting = JSON.parse(localStorage.getItem(QINIUOSS_IMAGE_HOSTING));
    const link = imageHosting.domain.split("://")[1];
    this.state = {
      imageHosting,
      link,
    };
  }

  regionChange = (value) => {
    const {imageHosting} = this.state;
    imageHosting.region = value;
    this.setState({imageHosting});
    localStorage.setItem(QINIUOSS_IMAGE_HOSTING, JSON.stringify(imageHosting));
  };

  accessKeyChange = (e) => {
    const {imageHosting} = this.state;
    imageHosting.accessKey = e.target.value;
    this.setState({imageHosting});
    localStorage.setItem(QINIUOSS_IMAGE_HOSTING, JSON.stringify(imageHosting));
  };

  secretKeyChange = (e) => {
    const {imageHosting} = this.state;
    imageHosting.secretKey = e.target.value;
    this.setState({imageHosting});
    localStorage.setItem(QINIUOSS_IMAGE_HOSTING, JSON.stringify(imageHosting));
  };

  bucketChange = (e) => {
    const {imageHosting} = this.state;
    imageHosting.bucket = e.target.value;
    this.setState({imageHosting});
    localStorage.setItem(QINIUOSS_IMAGE_HOSTING, JSON.stringify(imageHosting));
  };

  linkChange = (e) => {
    this.setState({link: e.target.value});

    const {imageHosting} = this.state;
    imageHosting.domain = "https://" + e.target.value;
    this.setState({imageHosting});
    localStorage.setItem(QINIUOSS_IMAGE_HOSTING, JSON.stringify(imageHosting));
  };

  namespaceChange = ({target: {value}}) => {
    const {imageHosting} = this.state;
    imageHosting.namespace = value;
    this.setState({imageHosting});
    localStorage.setItem(QINIUOSS_IMAGE_HOSTING, JSON.stringify(imageHosting));
  };

  render() {
    const {region, accessKey, secretKey, bucket, namespace} = this.state.imageHosting;
    const {link} = this.state;
    return (
      <Form {...formItemLayout}>
        <Form.Item label="存储空间名称" style={style.formItem}>
          <Input value={bucket} onChange={this.bucketChange} placeholder="例如：my-wechat" />
        </Form.Item>
        <Form.Item label="存储区域" style={style.formItem}>
          <Select value={region} onChange={this.regionChange} placeholder="例如：qiniu.region.z2">
            <Option value="z0">华东</Option>
            <Option value="z1">华北</Option>
            <Option value="z2">华南</Option>
            <Option value="na0">北美</Option>
            <Option value="as0">东南亚</Option>
          </Select>
        </Form.Item>
        <Form.Item label="AccessKey" style={style.formItem}>
          <Input value={accessKey} onChange={this.accessKeyChange} placeholder="例如：qweASDF1234zxcvb" />
        </Form.Item>
        <Form.Item label="SecretKey" style={style.formItem}>
          <Input value={secretKey} onChange={this.secretKeyChange} placeholder="例如：qweASDF1234zxcvbqweASD" />
        </Form.Item>
        <Form.Item label="自定义域名" style={style.formItem}>
          <Input value={link} onChange={this.linkChange} addonBefore="https://" placeholder="例如：qiniu.mdnice.com" />
        </Form.Item>
        <Form.Item label="自定义命名空间" style={style.formItem}>
          <Input value={namespace} onChange={this.namespaceChange} placeholder="例如：image/" />
        </Form.Item>
        <Form.Item label="提示" style={style.formItem}>
          <span>配置后请在右上角进行切换，</span>
          <a rel="noopener noreferrer" target="_blank" href="https://docs.mdnice.com/#/qiniu-image-hosting">
            七牛云图床配置文档
          </a>
        </Form.Item>
      </Form>
    );
  }
}

const style = {
  formItem: {
    marginBottom: "10px",
  },
};

export default QiniuOSS;
