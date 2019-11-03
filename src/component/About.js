import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button, ConfigProvider} from "antd";
import SvgIcon from "../icon";

@inject("dialog")
@observer
class About extends Component {
  handleClick = () => {
    this.props.dialog.setAboutOpen(true);
  };

  render() {
    return (
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Button style={style.btnPadding} onClick={this.handleClick}>
          <SvgIcon name="about" style={style.svgIcon} />
        </Button>
      </ConfigProvider>
    );
  }
}

const style = {
  btnPadding: {
    padding: "0",
  },
  svgIcon: {
    padding: "6px 7px 10px 7px",
    width: "33px",
    height: "33px",
  },
};

export default About;
