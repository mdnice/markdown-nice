import {observable, action} from "mobx";

class Dialog {
  @observable isImageOpen = false;

  @observable isLinkOpen = false;

  @observable isAboutOpen = false;

  @observable isVersionOpen = false;

  @observable isFormOpen = false;

  @observable isHistoryOpen = false;

  @observable isSearchOpen = false;

  @observable isSitDownOpen = false;

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

  @action
  setFormOpen = (isFormOpen) => {
    this.isFormOpen = isFormOpen;
  };

  @action
  setHistoryOpen = (isHistoryOpen) => {
    this.isHistoryOpen = isHistoryOpen;
  };

  @action
  setSearchOpen = (isSearchOpen) => {
    this.isSearchOpen = isSearchOpen;
  };

  @action
  setSitDownOpen = (isSitDownOpen) => {
    this.isSitDownOpen = isSitDownOpen;
  };
}

const store = new Dialog();

export default store;
