import React, { Component } from "react";
import "./Navbar.css";
import FullScreen from "../component/FullScreen";
import ThemeSelect from "../component/ThemeSelect";
import Save from "../component/Save";
import LogIn from "../component/LogIn";

import { observer, inject } from "mobx-react";

import { Button, Icon, Input } from "antd";
import delIcon from "../icon/del.svg";
import boldIcon from "../icon/bold.svg";
import italicIcon from "../icon/italic.svg";
import linkIcon from "../icon/link.svg";
import codeIcon from "../icon/code1.svg";

const ButtonGroup = Button.Group;

@inject("title")
@observer
class Navbar extends Component {
  changeTitle = event => {
    this.props.title.updateTitle(event.target.value);
  };

  render() {
    return (
      <div className="nav-bar">
        <div className="left-nav">
          <div className="title-container">
            <Input
              placeholder="标题"
              allowClear
              style={{ margin: 8 }}
              value={this.props.title.title}
              onChange={this.changeTitle}
            />
          </div>
        </div>
        <div className="right-nav">
          <ButtonGroup>
            <Button className="btn-padding">
              <Icon component={delIcon} className="icon-size"/>
            </Button>
            <Button className="btn-padding">
              <Icon component={boldIcon} className="icon-size"/>
            </Button>
            <Button className="btn-padding">
              <Icon component={italicIcon} className="icon-size"/>
            </Button>
          </ButtonGroup>
          <ButtonGroup className="btn-group-margin">
            <Button className="btn-padding">
              <Icon component={codeIcon} className="icon-size"/>
            </Button>
            <Button className="btn-padding">
              <Icon component={linkIcon} className="icon-size"/>
            </Button>
          </ButtonGroup>
          <ThemeSelect />
          <Save />
          {/* <button onClick={this.createRepo} id="createRepo">
            Create a New Repo
          </button> */}
          <FullScreen />
          <LogIn />
        </div>
      </div>
    );
  }
}

export default Navbar;
