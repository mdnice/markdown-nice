import React, { Component } from 'react';
import '../App.css'
import FullScreen from '../component/FullScreen'
import ThemeSelect from '../component/ThemeSelect'
import Save from '../component/Save'
import LogIn from '../component/LogIn'
import { Input } from 'antd';

import { observer, inject } from "mobx-react"

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

