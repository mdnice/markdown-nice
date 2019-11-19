import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {Tooltip, Button} from "antd";

import {ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";
import SvgIcon from "../../icon";
import "./Form.css";

@inject("dialog")
@observer
class Form extends Component {
  showModal = () => {
    this.props.dialog.setFormOpen(true);
  };

  render() {
    return (
      <Tooltip placement="bottom" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="表格">
        <Button className="nice-btn-form" onClick={this.showModal}>
          <SvgIcon name="form" className="nice-btn-form-icon" />
        </Button>
      </Tooltip>
    );
  }
}

export default Form;
