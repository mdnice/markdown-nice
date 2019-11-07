import juice from "juice";
import {message} from "antd";
import {BASIC_THEME_ID, CODE_THEME_ID, MARKDOWN_THEME_ID, LAYOUT_ID} from "./constant";

export const solveWeChatMath = () => {
  const layout = document.getElementById(LAYOUT_ID);
  const mjxs = layout.getElementsByTagName("mjx-container");
  for (let i = 0; i < mjxs.length; i++) {
    const mjx = mjxs[i];
    if (!mjx.hasAttribute("data")) {
      break;
    }

    mjx.removeAttribute("data");
    mjx.removeAttribute("jax");
    mjx.removeAttribute("display");
    mjx.removeAttribute("tabindex");
    mjx.removeAttribute("ctxtmenu_counter");
    const svg = mjx.firstChild;
    const width = svg.getAttribute("width");
    const height = svg.getAttribute("height");
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.style.width = width;
    svg.style.height = height;
  }
};

export const solveZhihuMath = () => {
  const layout = document.getElementById(LAYOUT_ID);
  const mjxs = layout.getElementsByTagName("mjx-container");
  for (let i = 0; i < mjxs.length; i++) {
    const mjx = mjxs[i];
    const data = mjx.getAttribute("data");
    if (!data) {
      continue;
    }

    mjx.innerHTML = '<img class="Formula-image" data-eeimg="true" src="" alt="' + data + '">';
  }
};

export const solveHtml = () => {
  const element = document.getElementById("wx-box");
  let html = element.innerHTML;
  html = html.replace(/\s<mjx-container class="inline/g, '&nbsp;<mjx-container class="inline');
  html = html.replace(/svg><\/mjx-container>\s/g, "svg></mjx-container>&nbsp;");
  const basicStyle = document.getElementById(BASIC_THEME_ID).innerText;
  const markdownStyle = document.getElementById(MARKDOWN_THEME_ID).innerText;
  const codeStyle = document.getElementById(CODE_THEME_ID).innerText;
  let res = "";
  try {
    res = juice.inlineContent(html, basicStyle + markdownStyle + codeStyle, {
      inlinePseudoElements: true,
      preserveImportant: true,
    });
  } catch (e) {
    message.error("请检查 CSS 文件是否编写正确！");
  }
  return res;
};

export const copySafari = (text) => {
  // 获取 input
  let input = document.getElementById("copy-input");
  if (!input) {
    // input 不能用 CSS 隐藏，必须在页面内存在。
    input = document.createElement("input");
    input.id = "copy-input";
    input.style.position = "absolute";
    input.style.left = "-1000px";
    input.style.zIndex = "-1000";
    document.body.appendChild(input);
  }
  // 让 input 选中一个字符，无所谓那个字符
  input.value = "NOTHING";
  input.setSelectionRange(0, 1);
  input.focus();

  // 复制触发
  document.addEventListener("copy", function copyCall(e) {
    e.preventDefault();
    e.clipboardData.setData("text/html", text);
    e.clipboardData.setData("text/plain", text);
    document.removeEventListener("copy", copyCall);
  });
  document.execCommand("copy");
};
