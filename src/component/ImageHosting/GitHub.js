import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Input, Form, Checkbox} from "antd";
import {GITHUB_IMAGE_HOSTING} from "../../utils/constant";

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
class Gitee extends Component {
  constructor(props) {
    super(props);
    // 从localstorage里面读取
    const imageHosting = JSON.parse(localStorage.getItem(GITHUB_IMAGE_HOSTING));
    this.state = {
      imageHosting,
    };
  }

  usernameChange = (e) => {
    const {imageHosting} = this.state;
    imageHosting.username = e.target.value;
    this.setState({imageHosting});
    localStorage.setItem(GITHUB_IMAGE_HOSTING, JSON.stringify(imageHosting));
  };

  repoChange = (e) => {
    const {imageHosting} = this.state;
    imageHosting.repo = e.target.value;
    this.setState({imageHosting});
    localStorage.setItem(GITHUB_IMAGE_HOSTING, JSON.stringify(imageHosting));
  };

  tokenChange = (e) => {
    const {imageHosting} = this.state;
    imageHosting.token = e.target.value;
    this.setState({imageHosting});
    localStorage.setItem(GITHUB_IMAGE_HOSTING, JSON.stringify(imageHosting));
  };

  jsdelivrChange = (e) => {
    const {imageHosting} = this.state;
    imageHosting.jsdelivr = e.target.checked ? "true" : "false";
    console.log(imageHosting);
    this.setState({imageHosting});
    localStorage.setItem(GITHUB_IMAGE_HOSTING, JSON.stringify(imageHosting));
  };

  render() {
    const {username, repo, token, jsdelivr} = this.state.imageHosting;
    return (
      <Form {...formItemLayout}>
        <Form.Item label="用户名" style={style.formItem}>
          <Input value={username} onChange={this.usernameChange} placeholder="例如：mdnice" />
        </Form.Item>
        <Form.Item label="仓库名" style={style.formItem}>
          <Input value={repo} onChange={this.repoChange} placeholder="例如：picture" />
        </Form.Item>
        <Form.Item label="token" style={style.formItem}>
          <Input value={token} onChange={this.tokenChange} placeholder="例如：qweASDF1234zxcvb" />
        </Form.Item>
        <Form.Item label="jsDelivr CDN" style={style.formItem}>
          <Checkbox checked={jsdelivr === "true"} onChange={this.jsdelivrChange}>
            （强烈建议开启，加速图片）
          </Checkbox>
        </Form.Item>
        <Form.Item label="提示" style={style.formItem}>
          <span>配置后请在右上角进行切换，</span>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://preview.mdnice.com/article/developer/github-image-hosting/"
          >
            GitHub图床配置文档
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

export default Gitee;
