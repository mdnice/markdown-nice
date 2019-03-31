import React from "react";
import { Menu, Dropdown, Avatar, Modal, message } from "antd";
import { observer, inject } from "mobx-react";

import { axiosGithub } from "../utils/helper";
import { ACCESS_TOKEN } from "../utils/constant";

@inject("userInfo")
@inject("dialog")
@inject("content")
@observer
class LogIn extends React.Component {
  showConfirm = () => {
    const content = (
      <p>
        <a target="_blank" href="https://github.com/zhning12/markdown-nice">
          markdown-nice
        </a>
        正在接收自定义主题，维护人员将会根据主题质量进行添加，是否确认将你的自定义CSS发送？
      </p>
    );
    const successInfo = link => {
      return (
        <span>
          提交成功，
          <a target="_blank" href={link}>
            查看Issue
          </a>
        </span>
      );
    };
    Modal.confirm({
      title: "确认发送Issue？",
      content: content,
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        const res = await axiosGithub.post(
          `/repos/zhning12/markdown-nice/issues`,
          {
            title: `自定义主题 by ${this.props.userInfo.userInfo.login}`,
            body: "```\n" + this.props.content.style + "\n```"
          }
        );
        if (res.status === 201) {
          message.success(successInfo(res.data.html_url), 5);
        } else {
          message.error("提交失败，请退出登录重试");
        }
      },
      onCancel() {
        // console.log('Cancel');
      }
    });
  };

  signOut = () => {
    window.localStorage.setItem(ACCESS_TOKEN, "");
    window.location.href = "/";
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a onClick={this.showConfirm}>提交主题</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <a onClick={this.signOut}>退出登录</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          <Avatar style={style.avatar} icon="user" shape="square" />
        </a>
      </Dropdown>
    );
  }
}

const style = {
  btnStyle: {
    border: "none",
    width: "24px",
    height: "24px"
  },
  iconSize: {
    fontSize: "24px"
  },
  avatar: {
    background: "white",
    color: "#1e1e1e",
    fontSize: "22px"
  }
};

export default LogIn;
