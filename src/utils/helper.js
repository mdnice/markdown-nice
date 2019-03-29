import axios from "axios";
import markdownIt from "markdown-it";
import markdownItSup from "markdown-it-sup";
import markdownItFootnote from "markdown-it-footnote";
import markdownItSub from "markdown-it-sub";
import markdownItDeflist from "markdown-it-deflist";
import markdownItSpan from "./span";
import highlightjs from "highlight.js";

export const axiosGithub = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/json"
  }
});

export const axiosJSON = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export const queryParse = (search = window.location.search) => {
  if (!search) return {};
  const queryString = search[0] === "?" ? search.substring(1) : search;
  const query = {};
  queryString.split("&").forEach(queryStr => {
    const [key, value] = queryStr.split("=");
    /* istanbul ignore else */
    if (key) query[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return query;
};

export const transCode = str => {
  return window.btoa(unescape(encodeURIComponent(str)));
};

export const deCode = str => {
  return decodeURIComponent(escape(window.atob(str)));
};

export const markdownParser = new markdownIt({
  highlight: (str, lang) => {
    if (lang && highlightjs.getLanguage(lang)) {
      try {
        return (
          '<pre ><code class="hljs">' +
          highlightjs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }
    return (
      '<pre ><code class="hljs">' +
      markdownParser.utils.escapeHtml(str) +
      "</code></pre>"
    );
  }
});

markdownParser
  .use(markdownItSpan) // 在标题标签中添加span
  .use(markdownItSup) // 上标
  .use(markdownItFootnote) // 脚注
  .use(markdownItSub) // 下标
  .use(markdownItDeflist); // 定义列表

export const replaceStyle = (id, css) => {
  const style = document.getElementById(id);
  try {
    style.innerHTML = css;
  } catch (ex) {
    style.styleSheet.cssText = css;
  }
  const head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
};
