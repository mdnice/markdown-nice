import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, ConfigProvider} from "antd";

@inject("dialog")
@observer
class About extends Component {
  handleClick = () => {
    this.props.dialog.setAboutOpen(true);
  };

  render() {
    return (
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Button style={style.btnHeight} onClick={this.handleClick}>
          关于
        </Button>
      </ConfigProvider>
    );
  }
}

const style = {
  btnHeight: {
    marginLeft: "10px",
  },
};

export default About;
