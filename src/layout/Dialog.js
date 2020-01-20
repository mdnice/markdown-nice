import React, {Component} from "react";
import ImageDialog from "../component/Dialog/ImageDialog";
import LinkDialog from "../component/Dialog/LinkDialog";
import AboutDialog from "../component/Dialog/AboutDialog";
import VersionDialog from "../component/Dialog/VersionDialog";
import FormDialog from "../component/Dialog/FormDialog";
import HistoryDialog from "../component/Dialog/HistoryDialog";

class Dialog extends Component {
  render() {
    return (
      <div>
        <ImageDialog />
        <LinkDialog />
        <AboutDialog />
        <VersionDialog />
        <FormDialog />
        <HistoryDialog />
      </div>
    );
  }
}

export default Dialog;
