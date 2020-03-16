import React, {Component} from "react";
import {message} from "antd";

import {FONT_THEME_ID, RIGHT_SYMBOL} from "../../../utils/constant";
import {replaceStyle} from "../../../utils/helper";
import "../common.css";

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
    const serif = `#nice { 
      font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }`;
    const sansSerif = `#nice { 
      font-family: Roboto, Oxygen, Ubuntu, Cantarell, PingFangSC-light, PingFangTC-light, 'Open Sans', 'Helvetica Neue', sans-serif;
    }`;
    const choosen = isSerif ? serif : sansSerif;
    replaceStyle(FONT_THEME_ID, choosen);
    message.success("字体切换成功！");
    this.setState({isSerif: !isSerif});
  };

  render() {
    return (
      <div id="nice-menu-font" className="nice-menu-item" onClick={this.toggleFont}>
        <span>
          <span className="nice-menu-flag">{!this.state.isSerif && <span>{RIGHT_SYMBOL}</span>}</span>
          <span className="nice-menu-name">衬线字体</span>
        </span>
      </div>
    );
  }
}

export default Font;
