// mobx
import { observable, action } from "mobx";
import { MARKDOWN_EXAMPLE, CONTENT } from "../utils/constant.js";

class Content {
  // 观察值
  @observable commitContent = MARKDOWN_EXAMPLE;
  // @observable commitVersion = "";

  @action
  updateContent = content => {
    this.commitContent = content;
    window.localStorage.setItem(CONTENT, content);
  };
}

const store = new Content();
const content = window.localStorage.getItem(CONTENT);
store.commitContent = content ? content : MARKDOWN_EXAMPLE;

export default store;
