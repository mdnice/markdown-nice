import {observable, action} from "mobx";
import {VERSION, VERSION_NUM} from "../utils/constant";

class Dialog {
  @observable isImageOpen = false;

  @observable isLinkOpen = false;

  @observable isAboutOpen = false;

  @observable isVersionOpen = false;

  @action
  setImageOpen = (isImageOpen) => {
    this.isImageOpen = isImageOpen;
  };

  @action
  setLinkOpen = (isLinkOpen) => {
    this.isLinkOpen = isLinkOpen;
  };

  @action
  setAboutOpen = (isAboutOpen) => {
    this.isAboutOpen = isAboutOpen;
  };

  @action
  setVersionOpen = (isVersionOpen) => {
    this.isVersionOpen = isVersionOpen;
  };
}

const store = new Dialog();

const isVersionDiff = localStorage.getItem(VERSION) !== VERSION_NUM;
if (isVersionDiff) {
  store.isVersionOpen = true;
  localStorage.setItem(VERSION, VERSION_NUM);
}

export default store;
