import React, { Component } from "react";
import ImageDialog from "../component/Dialog/ImageDialog"
import LinkDialog from "../component/Dialog/LinkDialog"
import AboutDialog from "../component/Dialog/AboutDialog";

class Dialog extends Component {
 
  render() {
    return (
      <div>
        <ImageDialog />
        <LinkDialog />
        <AboutDialog />
      </div>
    );
  }
}

export default Dialog;
