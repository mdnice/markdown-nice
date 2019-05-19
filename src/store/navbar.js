import { observable, action } from "mobx";
import { TEMPLATE_NUM, CODE_NUM, CODE_THEME_ID, CODE_OPTIONS } from "../utils/constant";
import TEMPLATE from "../template/index";
import { replaceStyle } from "../utils/helper";

class Navbar {
  @observable isStyleEditorOpen = false;
  @observable templateNum;
  @observable codeNum;

  @action
  setStyleEditorOpen = isStyleEditorOpen => {
    this.isStyleEditorOpen = isStyleEditorOpen;
  };

  @action
  setTemplateNum = templateNum => {
    this.templateNum = templateNum;
    window.localStorage.setItem(TEMPLATE_NUM, templateNum);
  };

  @action
  setCodeNum = codeNum => {
    this.codeNum = codeNum;
    window.localStorage.setItem(CODE_NUM, codeNum);
    // 更新style
    const { id } = CODE_OPTIONS[codeNum];
    if (codeNum !== 0) {
      replaceStyle(CODE_THEME_ID, TEMPLATE.code[id]);
    }
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

// 获取之前选择的主题状态
store.templateNum = parseInt(window.localStorage.getItem(TEMPLATE_NUM));
store.codeNum = parseInt(window.localStorage.getItem(CODE_NUM));

// 初始化代码主题
const codeId = CODE_OPTIONS[store.codeNum].id;
if (store.codeNum !== 0) {
  replaceStyle(CODE_THEME_ID, TEMPLATE.code[codeId]);
}

export default store;
