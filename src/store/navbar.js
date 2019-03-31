import { observable, action } from "mobx";
import { MARKDOWN_OPTIONS } from "../utils/constant"

class Navbar {
  @observable isStyleEditorOpen = false;
  @observable isWechatCode = true;
  @observable markdownId = MARKDOWN_OPTIONS[0].id;
  @observable markdownName = MARKDOWN_OPTIONS[0].name;

  @action
  setStyleEditorOpen = isStyleEditorOpen => {
    this.isStyleEditorOpen = isStyleEditorOpen;
  };

  @action
  setMarkdownId = markdownId => {
    this.markdownId = markdownId;
  };

  @action
  setMarkdownName = markdownName => {
    this.markdownName = markdownName;
  };

  @action
  setWechatCode = isWechatCode => {
    this.isWechatCode = isWechatCode;
  };
}

const store = new Navbar();

export default store;
