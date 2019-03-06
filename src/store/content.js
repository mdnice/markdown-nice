// mobx
import { observable, action } from "mobx";
import { MARKDOWN_EXAMPLE } from '../utils/constant.js';

class Content {
  // 观察值
  @observable commitContent = MARKDOWN_EXAMPLE;
  // @observable commitVersion = "";

  @action
  updateContent = (content) => {
    this.commitContent = content
  }
}

const store = new Content();

export default store;



