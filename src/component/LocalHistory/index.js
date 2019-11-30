import * as React from "react";
import {Button} from "antd";
import PreviewForm from "./preview";
import IndexDB from "./indexdb";
import {getLocalDocuments, setLocalDocuments, setLocalDraft, AutoSaveInterval} from "./util";
// import debouce from 'lodash/debounce';
import "./localHistory.css";

const NOOP = () => {};
class LocalHistory extends React.Component {
  timer = null;

  db = null;

  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      showPreview: false,
      markDownString: "",
    };
  }

  async componentDidMount() {
    await this.initIndexDB();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  //
  // async UNSAFE_componentWillReceiveProps(nextProps) {
  //   // 文档 id 变更
  //   if (this.props.documentID !== nextProps.documentID && nextProps.documentID != null) {
  //     if (this.db) {
  //       await this.refreshLocalDocuments(nextProps.documentID);
  //     }
  //   }
  // }

  preview = (content) => {
    this.setState({
      showPreview: true,
      markDownString: content,
    });
  };

  hidePreview = () => {
    this.setState({
      showPreview: false,
      markDownString: "",
    });
  };

  //
  autoSave = async (isRecent = false) => {
    const Content = this.props.editor.getValue();
    if (Content.trim() !== "") {
      const document = {
        Content,
        DocumentID: +this.props.documentID,
        BusinessID: +this.props.businessID,
        SaveTime: new Date(),
      };
      const setLocalDocumentMethod = isRecent && this.state.documents.length > 0 ? setLocalDraft : setLocalDocuments;
      await setLocalDocumentMethod(this.db, this.state.documents, document);
      await this.refreshLocalDocuments(this.props.documentID);
    }
  };

  async initIndexDB() {
    console.log("initIndexDB");
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
        await this.refreshLocalDocuments(this.props.documentID);
      }
      // 每隔一段时间自动保存
      this.timer = setInterval(async () => {
        await this.autoSave();
      }, AutoSaveInterval);
      // 每改变内容自动保存最近的一条
      this.props.editor.on &&
        this.props.editor.on(
          "change",
          async () => {
            console.log("change");
            await this.autoSave(true);
          },
          // debouce(async () => {
          //   await this.autoSave(true);
          // }, 1000),
        );
    } catch (e) {
      console.error(e);
    }
  }

  // 刷新本地历史文档
  async refreshLocalDocuments(documentID) {
    const localDocuments = await getLocalDocuments(this.db, +documentID);
    // console.log('refresh local',localDocuments);
    this.setState({
      documents: localDocuments,
    });
  }

  render() {
    const {documents} = this.state;
    return (
      <>
        {documents.map((d) => (
          <div key={d.id}>
            {/* 保存时间：{moment(d.SaveTime).format('YYYY-MM-DD HH:mm:ss')} */}
            保存时间：
            {d.SaveTime.toLocaleString()}
            <Button
              type="primary"
              onClick={() => {
                this.preview(d.Content);
              }}
            >
              预览
            </Button>
            <Button
              onClick={() => {
                this.props.onEdit(d.Content);
              }}
            >
              编辑
            </Button>
            <PreviewForm
              hideModal={this.hidePreview}
              visible={this.state.showPreview}
              markDownString={this.state.markDownString}
            />
          </div>
        ))}
      </>
    );
  }
}

LocalHistory.defaultProps = {
  visible: false,
  document: [],
  onEdit: NOOP,
};

export default LocalHistory;
