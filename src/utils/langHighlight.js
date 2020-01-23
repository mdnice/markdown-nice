// 缩小highlight包大小,按需引入,900kb->90kb
import highlightjs from "highlight.js/lib/highlight";

/* global HLSLANGUAGES */
const languages = HLSLANGUAGES;
languages.forEach((langName) => {
  // Using require() here because import() support hasn't landed in Webpack yet
  const langModule = require(`highlight.js/lib/languages/${langName}`);
  highlightjs.registerLanguage(langName, langModule);
});

export default highlightjs;
