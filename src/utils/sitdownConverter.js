import {Sitdown, RootNode} from "sitdown/dist/src.esm";
import {applyJuejinRule} from "@sitdown/juejin/dist/src.esm";
import {applyWechatRule, extraFootLinks} from "@sitdown/wechat/dist/src.esm";
import {applyZhihuRule} from "@sitdown/zhihu/dist/src.esm";

const gfm = new Sitdown({
  keepFilter: ["style"],
  codeBlockStyle: "fenced",
});
const juejin = new Sitdown({
  keepFilter: ["style"],
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  hr: "---",
});
juejin.use(applyJuejinRule);
const wechat = new Sitdown({
  keepFilter: ["style"],
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  hr: "---",
});
wechat.use(applyWechatRule);
const wechatToMD = (html) => {
  const root = new RootNode(html);
  const footLinks = extraFootLinks(root);
  return wechat.HTMLToMD(html, {footLinks});
};
const zhihu = new Sitdown({
  keepFilter: ["style"],
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  hr: "---",
});
zhihu.use(applyZhihuRule);
const csdn = new Sitdown({
  keepFilter: ["style"],
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  hr: "---",
});
const methods = {
  GFM: (input) => gfm.HTMLToMD(input),
  Juejin: (input) => juejin.HTMLToMD(input),
  Zhihu: (input) => zhihu.HTMLToMD(input),
  Wechat: (input) => wechatToMD(input),
  CSDN: (input) => csdn.HTMLToMD(input),
};

export default methods;
