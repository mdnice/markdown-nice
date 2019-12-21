import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Switch} from "antd";

@inject("navbar")
@observer
class ContainImgName extends Component {
  handleChange = (key) => {
    this.props.navbar.setContainImgName(key);
  };

  render() {
    return (
      <div style={{marginTop: "10px"}}>
        上传图片时包含名称：
        <Switch
          checkedChildren="开"
          unCheckedChildren="关"
          checked={this.props.navbar.isContainImgName}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default ContainImgName;
