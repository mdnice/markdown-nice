import React from "react";
import {Menu, Dropdown, Modal, message} from "antd";
import {observer, inject} from "mobx-react";

import {axiosGithub} from "../../utils/helper";
import {ACCESS_TOKEN} from "../../utils/constant";
import SvgIcon from "../../icon";
import "./User.css";

@inject("userInfo")
@inject("dialog")
@inject("content")
@observer
class LogIn extends React.Component {
  showConfirm = () => {
    const content = (
      <p>
        <a rel="noopener noreferrer" target="_blank" href="https://github.com/mdnice/markdown-nice">
          markdown-nice
        </a>
        正在接收自定义主题，维护人员将会根据主题质量进行添加，是否确认将你的自定义CSS发送？
      </p>
    );
    const successInfo = (link) => {
      return (
        <span>
          提交成功，
          <a rel="noopener noreferrer" target="_blank" href={link}>
            查看Issue
          </a>
        </span>
      );
    };
    Modal.confirm({
      title: "确认发送Issue？",
      content,
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        const res = await axiosGithub.post(`/repos/mdnice/markdown-nice/issues`, {
          title: `自定义主题 by ${this.props.userInfo.userInfo.login}`,
          body: "```\n" + this.props.content.style + "\n```",
        });
        if (res.status === 201) {
          message.success(successInfo(res.data.html_url), 5);
        } else {
          message.error("提交失败，请退出登录重试");
        }
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  signOut = () => {
    window.localStorage.setItem(ACCESS_TOKEN, "");
    window.location.href = "/";
  };

  render() {
    const hrefLink = "#";
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a className="nice-user-link" rel="noopener noreferrer" onClick={this.showConfirm} href={hrefLink}>
            提交主题
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <a className="nice-user-link" rel="noopener noreferrer" onClick={this.signOut} href={hrefLink}>
            退出登录
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link nice-user-link" rel="noopener noreferrer" href={hrefLink}>
          <SvgIcon name="rabbit" className="nice-user-icon" />
        </a>
      </Dropdown>
    );
  }
}

export default LogIn;
