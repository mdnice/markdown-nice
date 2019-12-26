import {observable, action} from "mobx";
import {
  TEMPLATE_NUM,
  CODE_NUM,
  CODE_THEME_ID,
  CODE_OPTIONS,
  IS_PASTE_CHECK_OPEN,
  IS_PRETTIER_OPEN,
  PREVIEW_TYPE,
  IS_SYNC_SCROLL,
  IS_CONTAIN_IMG_NAME,
} from "../utils/constant";
import TEMPLATE from "../template/index";
import {replaceStyle} from "../utils/helper";

class Navbar {
  @observable isStyleEditorOpen = false;

  @observable isPasteCheckOpen = true;

  @observable isPrettierOpen = true;

  @observable isImmersiveEditing = false;

  @observable isSyncScroll = true;

  @observable isContainImgName = false;

  @observable templateNum;

  @observable codeNum;

  @observable previewType;

  @action
  setStyleEditorOpen = (isStyleEditorOpen) => {
    this.isStyleEditorOpen = isStyleEditorOpen;
  };

  @action
  setAutoFootOpen = (isPasteCheckOpen) => {
    this.isPasteCheckOpen = isPasteCheckOpen;
  };

  @action
  setImmersiveEditing = (isImmersiveEditing) => {
    this.isImmersiveEditing = isImmersiveEditing;
  };

  @action
  setPrettierOpen = (isPrettierOpen) => {
    this.isPrettierOpen = isPrettierOpen;
  };

  @action
  setSyncScroll = (isSyncScroll) => {
    this.isSyncScroll = isSyncScroll;
    window.localStorage.setItem(IS_SYNC_SCROLL, isSyncScroll);
  };

  @action
  setContainImgName = (isContainImgName) => {
    this.isContainImgName = isContainImgName;
    window.localStorage.setItem(IS_CONTAIN_IMG_NAME, isContainImgName);
  };

  @action
  setTemplateNum = (templateNum) => {
    this.templateNum = templateNum;
    window.localStorage.setItem(TEMPLATE_NUM, templateNum);
  };

  @action
  setCodeNum = (codeNum) => {
    this.codeNum = codeNum;
    window.localStorage.setItem(CODE_NUM, codeNum);
    // 更新style
    const {id} = CODE_OPTIONS[codeNum];
    if (codeNum !== 0) {
      replaceStyle(CODE_THEME_ID, TEMPLATE.code[id]);
    }
  };

  @action
  setPreviewType = (previewType) => {
    this.previewType = previewType;
    window.localStorage.setItem(PREVIEW_TYPE, previewType);
  };
}

const store = new Navbar();

// 如果为空先把数据放进去
if (!window.localStorage.getItem(TEMPLATE_NUM)) {
  window.localStorage.setItem(TEMPLATE_NUM, 0);
}

// 如果为空先把数据放进去
if (!window.localStorage.getItem(CODE_NUM)) {
  window.localStorage.setItem(CODE_NUM, 0);
}

// 如果为空先把数据放进去
if (!window.localStorage.getItem(IS_PASTE_CHECK_OPEN)) {
  window.localStorage.setItem(IS_PASTE_CHECK_OPEN, true);
}

// 如果为空先把数据放进去
if (!window.localStorage.getItem(IS_PRETTIER_OPEN)) {
  window.localStorage.setItem(IS_PRETTIER_OPEN, true);
}

if (!window.localStorage.getItem(PREVIEW_TYPE)) {
  window.localStorage.setItem(PREVIEW_TYPE, "mobile");
}

if (!window.localStorage.getItem(IS_SYNC_SCROLL)) {
  window.localStorage.setItem(IS_SYNC_SCROLL, true);
}

if (!window.localStorage.getItem(IS_CONTAIN_IMG_NAME)) {
  window.localStorage.setItem(IS_CONTAIN_IMG_NAME, false);
}

// 获取之前选择的主题状态
store.templateNum = parseInt(window.localStorage.getItem(TEMPLATE_NUM), 10);
store.codeNum = parseInt(window.localStorage.getItem(CODE_NUM), 10);
store.isPasteCheckOpen = window.localStorage.getItem(IS_PASTE_CHECK_OPEN) === "true";
store.isPrettierOpen = window.localStorage.getItem(IS_PRETTIER_OPEN) === "true";
store.previewType = window.localStorage.getItem(PREVIEW_TYPE);
store.isSyncScroll = window.localStorage.getItem(IS_SYNC_SCROLL) === "true";
store.isContainImgName = window.localStorage.getItem(IS_CONTAIN_IMG_NAME) === "true";

// 初始化代码主题
const codeId = CODE_OPTIONS[store.codeNum].id;
if (store.codeNum !== 0) {
  replaceStyle(CODE_THEME_ID, TEMPLATE.code[codeId]);
}

export default store;
