import {observable, action} from "mobx";

class View {
  @observable isEditAreaOpen = true;

  @observable isPreviewAreaOpen = true;

  @observable isStyleEditorOpen = false;

  @observable isImmersiveEditing = false;

  @action
  setEditAreaOpen = (isEditAreaOpen) => {
    this.isEditAreaOpen = isEditAreaOpen;
  };

  @action
  setPreviewAreaOpen = (isPreviewAreaOpen) => {
    this.isPreviewAreaOpen = isPreviewAreaOpen;
  };

  @action
  setStyleEditorOpen = (isStyleEditorOpen) => {
    this.isStyleEditorOpen = isStyleEditorOpen;
  };

  @action
  setImmersiveEditing = (isImmersiveEditing) => {
    this.isImmersiveEditing = isImmersiveEditing;
  };
}

const store = new View();

export default store;
