import { observable, action } from "mobx";

class Dialog {
  @observable isImageOpen = false;
  @observable isLinkOpen = false;

  @action
  setImageOpen = isImageOpen => {
    this.isImageOpen = isImageOpen;
  };

  @action
  setLinkOpen = isLinkOpen => {
    this.isLinkOpen = isLinkOpen;
  };
}

const store = new Dialog();

export default store;
