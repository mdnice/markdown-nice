import React, { Component } from "react";
import ImageDialog from "../component/Dialog/ImageDialog"
import LinkDialog from "../component/Dialog/LinkDialog"

class Dialog extends Component {
 
  render() {
    return (
      <div>
        <ImageDialog />
        <LinkDialog />
      </div>
    );
  }
}

export default Dialog;
