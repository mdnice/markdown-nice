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
