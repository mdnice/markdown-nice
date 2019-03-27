import React, { Component } from 'react';
import '../App.css'
import FullScreen from '../component/FullScreen'
import ThemeSelect from '../component/ThemeSelect'
import Save from '../component/Save'
import LogIn from '../component/LogIn'
import { Input } from 'antd';

import { observer, inject } from "mobx-react";

import { Button, Icon } from 'antd';
import delIcon from '../icon/del.svg'
import boldIcon from '../icon/bold.svg'
import italicIcon from '../icon/italic.svg'
import linkIcon from '../icon/link.svg'
import codeIcon from '../icon/code1.svg'

const ButtonGroup = Button.Group;

@inject("title")
@observer
class Navbar extends Component {

  changeTitle = (event) => {
    this.props.title.updateTitle(event.target.value);
  }

  render() {
    return (
      <div className="navi-bar">
        <div className="left-nav">
          <div className="title-container">
            <Input placeholder="标题" allowClear style={{ margin: 8 }} value={this.props.title.title} onChange={this.changeTitle} />

          </div>

        </div>
        <div className="right-nav">
          <ButtonGroup>
            <Button style={{ padding: "0 8px" }}>
              <Icon component={delIcon} style={{ fontSize: "18px" }}></Icon></Button>
            <Button style={{ padding: "0 8px" }}>
              <Icon component={boldIcon} style={{ fontSize: "18px" }}></Icon></Button>
            <Button style={{ padding: "0 8px" }}>
              <Icon component={italicIcon} style={{ fontSize: "18px" }}></Icon></Button>
          </ButtonGroup>
          <ButtonGroup style={{marginLeft:'10px'}}>
            <Button style={{ padding: "0 8px" }}>
              <Icon component={codeIcon} style={{ fontSize: "18px" }}></Icon></Button>
            <Button style={{ padding: "0 8px" }}>
              <Icon component={linkIcon} style={{ fontSize: "18px" }}></Icon></Button>
          </ButtonGroup>
          <ThemeSelect></ThemeSelect>
          <Save></Save>
          {/* <button onClick={this.createRepo} id="createRepo">
            Create a New Repo
          </button> */}
          <FullScreen></FullScreen>
          <LogIn></LogIn>


        </div>
      </div>

    );
  }
}

export default Navbar;

