import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal, Empty, message} from "antd";
import LocalHistory from "../LocalHistory";
import {AutoSaveInterval, getLocalDocuments, setLocalDocuments, setLocalDraft} from "../LocalHistory/util";
import IndexDB from "../LocalHistory/indexdb";
import debouce from "lodash.debounce";

const DocumentID = 1;

@inject("dialog")
@inject("content")
@observer
class HistoryDialog extends Component {
  timer = null;

  db = null;

  constructor(props) {
    super(props);
    this.state = {
      documents: [],
    };
  }

  async componentDidMount() {
    await this.initIndexDB();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  get editor() {
    return this.props.content.markdownEditor;
  }

  //
  // async UNSAFE_componentWillReceiveProps(nextProps) {
  //   // 文档 id 变更
  //   if (this.props.documentID !== nextProps.documentID && nextProps.documentID != null) {
  //     if (this.db) {
  //       await this.overrideLocalDocuments(nextProps.documentID);
  //     }
  //   }
  // }
  //

  closeDialog = () => {
    this.props.dialog.setHistoryOpen(false);
  };

  editLocalDocument = (content) => {
    this.props.content.setContent(content);
    message.success("恢复成功！");
    this.closeDialog();
  };

  autoSave = async (isRecent = false) => {
    const Content = this.props.content.markdownEditor.getValue();
    if (Content.trim() !== "") {
      const document = {
        Content,
        DocumentID: this.props.documentID,
        SaveTime: new Date(),
      };
      const setLocalDocumentMethod = isRecent && this.state.documents.length > 0 ? setLocalDraft : setLocalDocuments;
      await setLocalDocumentMethod(this.db, this.state.documents, document);
      await this.overrideLocalDocuments(this.props.documentID);
    }
  };

  async initIndexDB() {
    try {
      const indexDB = new IndexDB({
        name: "mdnice-local-history",
        storeName: "customers",
        storeOptions: {keyPath: "id", autoIncrement: true},
        storeInit: (objectStore) => {
          objectStore.createIndex("DocumentID", "DocumentID", {unique: false});
          objectStore.createIndex("SaveTime", "SaveTime", {unique: false});
        },
      });
      this.db = await indexDB.init();

      if (this.db && this.props.documentID) {
        await this.overrideLocalDocuments(this.props.documentID);
      }
      // 每隔一段时间自动保存
      this.timer = setInterval(async () => {
        await this.autoSave();
      }, AutoSaveInterval);
      // 每改变内容自动保存最近的一条
      this.editor.on &&
        this.editor.on(
          "change",
          debouce(async () => {
            await this.autoSave(true);
          }, 1000),
        );
    } catch (e) {
      console.error(e);
    }
  }

  // 刷新本地历史文档
  async overrideLocalDocuments(documentID) {
    const localDocuments = await getLocalDocuments(this.db, +documentID);
    // console.log('refresh local',localDocuments);
    this.setState({
      documents: localDocuments,
    });
  }

  render() {
    return (
      <Modal
        className="nice-md-local-history"
        title="本地历史"
        centered
        width={1080}
        visible={this.props.dialog.isHistoryOpen}
        onCancel={this.closeDialog}
        footer={null}
      >
        {this.state.documents && this.state.documents.length > 0 ? (
          <LocalHistory
            content={this.props.content.content}
            documents={this.state.documents}
            documentID={this.props.documentID}
            onEdit={this.editLocalDocument}
            onCancel={this.closeDialog}
          />
        ) : (
          <Empty style={{width: "100%"}} description="暂无本地历史" />
        )}
      </Modal>
    );
  }
}

HistoryDialog.defaultProps = {
  documentID: DocumentID,
};

export default HistoryDialog;
