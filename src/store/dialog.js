import { observable, action } from "mobx";

class Dialog {
  @observable isImageOpen = false;
  @observable isLinkOpen = false;
  @observable isAboutOpen = false;

  @action
  setImageOpen = isImageOpen => {
    this.isImageOpen = isImageOpen;
  };

  @action
  setLinkOpen = isLinkOpen => {
    this.isLinkOpen = isLinkOpen;
  };

  @action
  setAboutOpen = isAboutOpen => {
    this.isAboutOpen = isAboutOpen;
  };
}

const store = new Dialog();

export default store;
