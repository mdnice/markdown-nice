import React from "react";

import {Tooltip, Button, Icon} from "antd";

import SaveIcon from "../icon/save.svg";
import {observer, inject} from "mobx-react";
import {axiosGithub, transCode} from "../utils/helper";

@inject("content")
@inject("title")
@inject("userInfo")
@observer
class Save extends React.Component {
  commitFile = async () => {
    try {
      const response = await axiosGithub.put(
        `/repos/${this.props.userInfo.userInfo.login}/markdownEth-10/contents/${this.props.title.title}.md`,
        {
          message: `${this.props.title.title} modify at ` + new Date(),
          content: transCode(this.props.content.content),
        },
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      this.createRepo();
    }
  };

  createRepo = async () => {
    try {
      const response = await axiosGithub.post("/user/repos", {
        name: "markdownEth-10",
        auto_init: true,
      });
      this.commitFile();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  getAllRepos = async () => {
    try {
      const response = await axiosGithub.get(`/users/${this.props.userInfo.userInfo.login}/repos`);
      this.props.userInfo.setUserRepos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={0.5} mouseLeaveDelay={0.2} title="保存提交">
        <Button style={{padding: "0 8px"}} onClick={this.commitFile}>
          <Icon component={SaveIcon} style={{fontSize: "18px"}} />
        </Button>
      </Tooltip>
    );
  }
}

export default Save;
