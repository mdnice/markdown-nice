import juice from "juice";
import {message} from "antd";
import {BASIC_THEME_ID, CODE_THEME_ID, MARKDOWN_THEME_ID, LAYOUT_ID} from "./constant";

export const solveMath = () => {
  const layout = document.getElementById(LAYOUT_ID);
  const svgArr = layout.getElementsByTagName("svg");
  for (let i = 0; i < svgArr.length; i++) {
    const svg = svgArr[i];
    if (!svg.hasAttribute("style")) {
      continue;
    }

    const width = svg.getAttribute("width");
    if (width === null) {
      break;
    }
    const height = svg.getAttribute("height");
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.style.width = width;
    svg.style.height = height;
  }
};

export const solveHtml = () => {
  const element = document.getElementById("wx-box");
  let html = element.innerHTML;
  html = html.replace(/\s<span class="inline/g, '&nbsp;<span class="inline');
  html = html.replace(/svg><\/span>\s/g, "svg></span>&nbsp;");
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
