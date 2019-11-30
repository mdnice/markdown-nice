import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Drawer} from "antd";
import LocalHistory from "../LocalHistory";

@inject("dialog")
@inject("content")
@observer
class HistoryDialog extends Component {
  closeDialog = () => {
    this.props.dialog.setHistoryOpen(false);
  };

  editLocalDocument = (content) => {
    this.props.content.setContent(content);
    this.closeDialog();
  };

  render() {
    return (
      <Drawer
        className="nice-md-local-history"
        title="本地历史"
        placement="right"
        closable={false}
        width={450}
        visible={this.props.dialog.isHistoryOpen}
        onClose={this.closeDialog}
      >
        <LocalHistory
          editor={this.props.content.markdownEditor}
          content={this.props.content.content}
          documentID={1}
          onEdit={this.editLocalDocument}
        />
      </Drawer>
    );
  }
}

export default HistoryDialog;
