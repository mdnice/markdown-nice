import React, {Component} from "react";
import {Tooltip, Button} from "antd";

import {ENTER_DELAY, LEAVE_DELAY, FONT_THEME_ID} from "../utils/constant";
import {replaceStyle} from "../utils/helper";
import SvgIcon from "../icon";

class Font extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSerif: false,
    };
  }

  // 衬线字体 和 非衬线字体 切换
  toggleFont = () => {
    const {isSerif} = this.state;
    const serif = `.layout { 
      font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }`;
    const sansSerif = `.layout { 
      font-family: Roboto, Oxygen, Ubuntu, Cantarell, PingFangSC-light, PingFangTC-light, 'Open Sans', 'Helvetica Neue', sans-serif;
    }`;
    const choosen = isSerif ? serif : sansSerif;
    replaceStyle(FONT_THEME_ID, choosen);
    this.setState({isSerif: !isSerif});
  };

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="字体">
        <Button style={style.btnPadding} onClick={this.toggleFont}>
          <SvgIcon name="font" style={style.svgIcon} />
        </Button>
      </Tooltip>
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

export default Font;
