import { observable, action } from "mobx";
import { MARKDOWN_OPTIONS } from "../utils/constant"

class Navbar {
  @observable isStyleEditorOpen = false;
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
}

const store = new Navbar();

export default store;
