import {observable, action} from "mobx";
import {
  TEMPLATE_NUM,
  CODE_NUM,
  CODE_THEME_ID,
  CODE_OPTIONS,
  PREVIEW_TYPE,
  IS_SYNC_SCROLL,
  IS_CONTAIN_IMG_NAME,
  IS_MAC_CODE,
} from "../utils/constant";
import TEMPLATE from "../template/index";
import {replaceStyle} from "../utils/helper";

class Navbar {
  // 是否同步滚动
  @observable isSyncScroll = true;

  // 是否保留图片名称
  @observable isContainImgName = false;

  // 主题序号
  @observable templateNum;

  // 代码主题序号
  @observable codeNum;

  // 是否为 Mac 风格代码
  @observable isMacCode = true;

  // 预览类型
  @observable previewType;

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
  setCodeNum = (codeNum, isMacCode) => {
    this.codeNum = codeNum;
    window.localStorage.setItem(CODE_NUM, codeNum);
    // 更新style
    const {id, macId} = CODE_OPTIONS[codeNum];
    //  Mac 风格代码
    if (isMacCode) {
      replaceStyle(CODE_THEME_ID, TEMPLATE.code[macId]);
    } else {
      replaceStyle(CODE_THEME_ID, TEMPLATE.code[id]);
    }
  };

  @action
  setMacCode = (isMacCode) => {
    this.isMacCode = isMacCode;
    window.localStorage.setItem(IS_MAC_CODE, isMacCode);
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

if (!window.localStorage.getItem(PREVIEW_TYPE)) {
  window.localStorage.setItem(PREVIEW_TYPE, "mobile");
}

if (!window.localStorage.getItem(IS_SYNC_SCROLL)) {
  window.localStorage.setItem(IS_SYNC_SCROLL, true);
}

if (!window.localStorage.getItem(IS_CONTAIN_IMG_NAME)) {
  window.localStorage.setItem(IS_CONTAIN_IMG_NAME, false);
}

if (!window.localStorage.getItem(IS_MAC_CODE)) {
  window.localStorage.setItem(IS_MAC_CODE, false);
}

// 获取之前选择的主题状态
store.templateNum = parseInt(window.localStorage.getItem(TEMPLATE_NUM), 10);

if (parseInt(window.localStorage.getItem(CODE_NUM), 10) >= CODE_OPTIONS.length) {
  window.localStorage.setItem(CODE_NUM, 0);
}
store.codeNum = parseInt(window.localStorage.getItem(CODE_NUM), 10);

store.previewType = window.localStorage.getItem(PREVIEW_TYPE);
store.isSyncScroll = window.localStorage.getItem(IS_SYNC_SCROLL) === "true";
store.isContainImgName = window.localStorage.getItem(IS_CONTAIN_IMG_NAME) === "true";
store.isMacCode = window.localStorage.getItem(IS_MAC_CODE) === "true";

// 初始化代码主题
const {macId, id} = CODE_OPTIONS[store.codeNum];
if (store.isMacCode) {
  replaceStyle(CODE_THEME_ID, TEMPLATE.code[macId]);
} else {
  replaceStyle(CODE_THEME_ID, TEMPLATE.code[id]);
}

export default store;
