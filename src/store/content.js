import {observable, action} from "mobx";
import {
  CONTENT,
  STYLE,
  TEMPLATE_OPTIONS,
  TEMPLATE_NUM,
  TEMPLATE_CUSTOM_NUM,
  MARKDOWN_THEME_ID,
  BASIC_THEME_ID,
  STYLE_LABELS,
} from "../utils/constant";
import {replaceStyle, addStyleLabel} from "../utils/helper";
import TEMPLATE from "../template/index";

class Content {
  @observable content;

  @observable style;

  @observable markdownEditor;

  @action
  setMarkdownEditor = (markdownEditor) => {
    this.markdownEditor = markdownEditor;
  };

  @action
  setContent = (content) => {
    this.content = content;
    window.localStorage.setItem(CONTENT, content);
  };

  @action
  setStyle = (style) => {
    this.style = style;
    replaceStyle(MARKDOWN_THEME_ID, style);
  };

  // 自定义样式
  @action
  setCustomStyle = (style = "") => {
    // 如果传入则更新
    if (style) {
      window.localStorage.setItem(STYLE, style);
    }
    this.style = window.localStorage.getItem(STYLE);
    replaceStyle(MARKDOWN_THEME_ID, this.style);
  };
}

const store = new Content();

// 如果为空先把数据放进去
if (window.localStorage.getItem(CONTENT) === null) {
  window.localStorage.setItem(CONTENT, TEMPLATE.content);
}
if (!window.localStorage.getItem(STYLE)) {
  window.localStorage.setItem(STYLE, TEMPLATE.style.custom);
}

const templateNum = parseInt(window.localStorage.getItem(TEMPLATE_NUM), 10);

// 用于处理刷新后的信息持久化
// 属于自定义主题则从localstorage中读数据
if (templateNum === TEMPLATE_CUSTOM_NUM) {
  store.style = window.localStorage.getItem(STYLE);
} else {
  if (templateNum) {
    const {id} = TEMPLATE_OPTIONS[templateNum];
    store.style = TEMPLATE.style[id];
  } else {
    store.style = TEMPLATE.style.normal;
  }
}

// 在head中添加style标签
addStyleLabel(STYLE_LABELS);

// 初始化整体主题
replaceStyle(BASIC_THEME_ID, TEMPLATE.basic);
replaceStyle(MARKDOWN_THEME_ID, store.style);

store.content = window.localStorage.getItem(CONTENT);

export default store;
