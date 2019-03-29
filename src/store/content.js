import { observable, action } from "mobx";
import { MARKDOWN_EXAMPLE, CONTENT, STYLE } from "../utils/constant.js";
import DEFAULT_THEME from "../theme/markdown/normal";
import THEMES from "../theme/index";

class Content {
  @observable content = MARKDOWN_EXAMPLE;
  @observable style = DEFAULT_THEME;

  @action
  setContent = content => {
    this.content = content;
    window.localStorage.setItem(CONTENT, content);
  };

  @action
  setStyle = (style) => {
    this.style = style;
  };

  // 自定义样式
  @action
  setCustomStyle = (style = "") => {
    console.log(2)
    // 如果传入则更新
    if(style) {
      window.localStorage.setItem(STYLE, style);
    }
    this.style = window.localStorage.getItem(STYLE);
  }
}

const store = new Content();
// 用于处理刷新后的信息持久化
const content = window.localStorage.getItem(CONTENT);
store.content = content ? content : MARKDOWN_EXAMPLE;

window.localStorage.setItem(STYLE, THEMES.markdown["custom"]);

export default store;
