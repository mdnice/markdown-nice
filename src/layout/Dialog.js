import React, {Component} from "react";
import ImageDialog from "../component/Dialog/ImageDialog";
import LinkDialog from "../component/Dialog/LinkDialog";
import AboutDialog from "../component/Dialog/AboutDialog";
import VersionDialog from "../component/Dialog/VersionDialog";

class Dialog extends Component {
  render() {
    return (
      <div>
        <ImageDialog />
        <LinkDialog />
        <AboutDialog />
        <VersionDialog />
      </div>
    );
  }
}

export default Dialog;
