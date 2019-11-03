import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {Tooltip, Button} from "antd";

import {ENTER_DELAY, LEAVE_DELAY} from "../utils/constant";
import SvgIcon from "../icon";

@inject("dialog")
@observer
class Form extends Component {
  showModal = () => {
    this.props.dialog.setFormOpen(true);
  };

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="表格">
        <Button style={style.btnPadding} onClick={this.showModal}>
          <SvgIcon name="form" style={style.svgIcon} />
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

export default Form;
