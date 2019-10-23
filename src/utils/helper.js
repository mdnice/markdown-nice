import axios from "axios";
import MarkdownIt from "markdown-it";
import markdownItSup from "markdown-it-sup";
import markdownItMath from "./markdown-it-math";
import markdownItSub from "markdown-it-sub";
import markdownItDeflist from "markdown-it-deflist";
import markdownItImplicitFigures from "markdown-it-implicit-figures";
import markdownItTableOfContents from "markdown-it-table-of-contents";
import markdownItRuby from "markdown-it-ruby";
import markdownItSpan from "./markdown-it-span";
import markdownItRemovepre from "./markdown-it-removepre";
import markdownItLinkfoot from "./markdown-it-linkfoot";
import highlightjs from "./langHighlight";
import markdownLiReplacer from "./markdown-it-li";

export const axiosGithub = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/json",
  },
});

export const axiosJSON = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const axiosMdnice = axios.create({
  // baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8081" : "https://math.mdnice.com",
  baseURL: process.env.NODE_ENV === "development" ? "https://math.mdnice.com" : "https://math.mdnice.com",
});

export const queryParse = (search = window.location.search) => {
  if (!search) return {};
  const queryString = search[0] === "?" ? search.substring(1) : search;
  const query = {};
  queryString.split("&").forEach((queryStr) => {
    const [key, value] = queryStr.split("=");
    /* istanbul ignore else */
    if (key) query[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return query;
};

export const transCode = (str) => {
  return window.btoa(unescape(encodeURIComponent(str)));
};

export const deCode = (str) => {
  return decodeURIComponent(escape(window.atob(str)));
};

// 专门微信代码高亮的解析器
export const markdownParserWechat = new MarkdownIt({
  html: true,
  highlight: (str, lang) => {
    const text = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const lines = text.split("\n");
    const codeLines = [];
    const numbers = [];
    for (let i = 0; i < lines.length - 1; i++) {
      codeLines.push('<code><span class="code-snippet_outer">' + (lines[i] || "<br>") + "</span></code>");
      numbers.push("<li></li>");
    }
    return (
      '<section class="code-snippet__fix code-snippet__js">' +
      '<ul class="code-snippet__line-index code-snippet__js">' +
      numbers.join("") +
      "</ul>" +
      '<pre class="code-snippet__js" data-lang="' +
      lang +
      '">' +
      codeLines.join("") +
      "</pre></section>"
    );
  },
});

markdownParserWechat
  .use(markdownItSpan) // 在标题标签中添加span
  .use(markdownItRemovepre) // 移除代码段中的 pre code
  .use(markdownItSup) // 上标
  .use(markdownItMath) // 数学公式
  .use(markdownItLinkfoot) // 修改脚注
  .use(markdownItSub) // 下标
  .use(markdownItTableOfContents, {
    transformLink: () => "",
    includeLevel: [2, 3],
  }) // TOC仅支持二级和三级标题
  .use(markdownItRuby) // 注音符号
  .use(markdownItImplicitFigures, {figcaption: true}) // 图示
  .use(markdownItDeflist) // 定义列表
  .use(markdownLiReplacer); // li 标签中加入 p 标签

// 普通解析器，代码高亮用highlight
export const markdownParser = new MarkdownIt({
  html: true,
  highlight: (str, lang) => {
    // 加上custom则表示自定义样式，而非微信专属，避免被remove pre
    if (lang && highlightjs.getLanguage(lang)) {
      try {
        return (
          '<pre class="custom"><code class="hljs">' + highlightjs.highlight(lang, str, true).value + "</code></pre>"
        );
      } catch (e) {
        console.log(e);
      }
    }
    return '<pre class="custom"><code class="hljs">' + markdownParser.utils.escapeHtml(str) + "</code></pre>";
  },
});

markdownParser
  .use(markdownItSpan) // 在标题标签中添加span
  .use(markdownItSup) // 上标
  .use(markdownItMath) // 数学公式
  .use(markdownItLinkfoot) // 修改脚注
  .use(markdownItSub) // 下标
  .use(markdownItTableOfContents, {
    transformLink: () => "",
    includeLevel: [2, 3],
  }) // TOC仅支持二级和三级标题
  .use(markdownItRuby) // 注音符号
  .use(markdownItImplicitFigures, {figcaption: true}) // 图示
  .use(markdownItDeflist) // 定义列表
  .use(markdownLiReplacer); // li 标签中加入 p 标签

export const replaceStyle = (id, css) => {
  const style = document.getElementById(id);
  try {
    style.innerHTML = css;
  } catch (e) {
    console.log(e);
    style.styleSheet.cssText = css;
  }
  const head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
};

export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
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
};

// base64转blob
export const toBlob = (base64, fileType) => {
  const bytes = window.atob(base64);
  let n = bytes.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bytes.charCodeAt(n);
  }
  return new Blob([u8arr], {type: fileType});
};

export const dateFormat = (date, fmt) => {
  var o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return fmt;
};

// export const url2Blob = (imgUrl) => {
//   window.URL = window.URL || window.webkitURL;
//   var xhr = new XMLHttpRequest();
//   xhr.open("get", imgUrl, true);
//   xhr.responseType = "blob";
//   xhr.onload = function () {
//     if (this.status == 200) {
//       //得到一个blob对象
//       var blob = this.response;
//       console.log("blob", blob)
//     }
//   }
//   xhr.send();
// }

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var dataURL = canvas.toDataURL("image/png"); // 可选其他值 image/jpeg
  return dataURL;
}

export const url2Blob = (src, cb) => {
  var image = new Image();
  image.src = src + "?v=" + Math.random(); // 处理缓存
  image.crossOrigin = "Anonymous"; // 支持跨域图片
  image.onload = () => {
    var base64 = getBase64Image(image);
    cb && cb(base64);
  };
};

// 是否为PC端
export const isPC = () => {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

export const getOSSName = (originName, namespace = "") => {
  const names = originName.split(".");
  let key = "";
  if (names.length > 1) {
    const suffix = names.pop();
    key = `${names.join(".")}_${dateFormat(new Date(), "yyyyMMddhhmmss")}.${suffix}`;
  } else {
    key = originName + "_" + dateFormat(new Date(), "yyyyMMddhhmmss");
  }
  return `${namespace}${key}`;
};

export const addStyleLabel = (styleLabels) => {
  const add = (name) => {
    const style = document.createElement("style");
    style.id = name;
    const head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
  };
  styleLabels.forEach((name) => add(name));
};

export const updateMathjax = () => {
  window.MathJax.texReset();
  window.MathJax.typesetClear();
  window.MathJax.typesetPromise()
    .then(() => {
      const element = document.getElementById("layout");
      let html = element.innerHTML;
      html = html.replace(
        /<mjx-container.+?display.+?>(.+?)<\/mjx-container>/g,
        '<section class="block-equation">$1</section>',
      );
      html = html.replace(/<mjx-container.+?>(.+?)<\/mjx-container>/g, '<span class="inline-equation">$1</span>');
      element.innerHTML = html;
    })
    .catch((err) => console.log(err.message));
};
