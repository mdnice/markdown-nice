import axios from "axios";
import markdownIt from "markdown-it";
import markdownItSup from "markdown-it-sup";
import markdownItKatex from "markdown-it-katex";
import markdownItSub from "markdown-it-sub";
import markdownItDeflist from "markdown-it-deflist";
import markdownItImplicitFigures from "markdown-it-implicit-figures";
import markdownItSpan from "./markdown-it-span";
import markdownItRemovepre from "./markdown-it-removepre";
import markdownItChangefoot from "./markdown-it-changefoot";
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

// 专门微信代码高亮的解析器
export const markdownParserWechat = new markdownIt({
  html: true,
  highlight: (str, lang) => {
    const text = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const lines = text.split("\n");
    const codeLines = [];
    const numbers = [];
    for (let i = 0; i < lines.length - 1; i++) {
      codeLines.push(
        '<code><span class="code-snippet_outer">' +
          (lines[i] || "<br>") +
          "</span></code>"
      );
      numbers.push("<li></li>");
    }
    return (
      '<section class="code-snippet__fix code-snippet__js">' +
      '<ol class="code-snippet__line-index code-snippet__js">' +
      numbers.join("") +
      "</ol>" +
      '<pre class="code-snippet__js" data-lang="' +
      lang +
      '">' +
      codeLines.join("") +
      "</pre></section>"
    );
  }
});

markdownParserWechat
  .use(markdownItSpan) // 在标题标签中添加span
  .use(markdownItRemovepre) // 移除代码段中的 pre code
  .use(markdownItSup) // 上标
  .use(markdownItKatex) // 数学公式
  .use(markdownItChangefoot) // 修改脚注
  .use(markdownItSub) // 下标
  .use(markdownItImplicitFigures, { figcaption: true }) // 图示
  .use(markdownItDeflist); // 定义列表

// 普通解析器，代码高亮用highlight
export const markdownParser = new markdownIt({
  html: true,
  highlight: (str, lang) => {
    // 加上custom则表示自定义样式，而非微信专属，避免被remove pre
    if (lang && highlightjs.getLanguage(lang)) {
      try {
        return (
          '<pre class="custom"><code class="hljs">' +
          highlightjs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }
    return (
      '<pre class="custom"><code class="hljs">' +
      markdownParser.utils.escapeHtml(str) +
      "</code></pre>"
    );
  }
});

markdownParser
  .use(markdownItSpan) // 在标题标签中添加span
  .use(markdownItSup) // 上标
  .use(markdownItKatex) // 数学公式
  .use(markdownItChangefoot) // 修改脚注
  .use(markdownItSub) // 下标
  .use(markdownItImplicitFigures, { figcaption: true }) // 图示
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


export const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
  }

const blob = new Blob(byteArrays, {type: contentType});
return blob;
}