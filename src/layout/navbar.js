import React, { Component } from 'react';
import '../App.css'
import FullScreen from '../component/FullScreen'
import ThemeSelect from '../component/ThemeSelect'
import Save from '../component/Save'
import LogIn from '../component/LogIn'

import fullscreen from '../icon/fullscreen.svg'; // path to your '*.svg' file.


import { observer, inject } from "mobx-react"

import TextField from '@material-ui/core/TextField';


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
            <TextField
              style={{ margin: 8 }}
              placeholder="标题"
              fullWidth
              margin="normal"
              value={this.props.title.title} onChange={this.changeTitle}
            />
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

