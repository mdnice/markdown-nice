import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Input} from "antd";

@inject("title")
@observer
class Title extends Component {
  render() {
    return (
      <div style={style.titleContainer}>
        <Input
          placeholder="标题"
          allowClear
          style={{margin: 8}}
          value={this.props.title.title}
          onChange={this.changeTitle}
        />
      </div>
    );
  }
}

const style = {
  titleContainer: {
    width: "50%",
    display: "flex",
    alignItems: "center",
  },
};

export default Title;
