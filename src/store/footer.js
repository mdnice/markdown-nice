import {observable, action} from "mobx";

class Footer {
  // 是否检测到富文本粘贴
  @observable isPasteHtmlChecked = false;

  // 粘贴的富文本
  @observable pasteHtml = "";

  // 粘贴的普通文本
  @observable pasteText = "";

  @action
  setPasteHtmlChecked = (isPasteHtmlChecked) => {
    this.isPasteHtmlChecked = isPasteHtmlChecked;
  };

  @action
  setPasteHtml = (pasteHtml) => {
    this.pasteHtml = pasteHtml;
  };

  @action
  setPasteText = (pasteText) => {
    this.pasteText = pasteText;
  };
}

const store = new Footer();

export default store;
