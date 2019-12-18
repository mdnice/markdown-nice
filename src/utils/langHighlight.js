// 缩小highlight包大小,按需引入,900kb->90kb
import highlightjs from "highlight.js/lib/highlight";

const languages = ["bash",
  "clojure", "cpp", "cs", "css",
  "dart", "dockerfile", "diff"
  "erlang",
  "go", "gradle", "groovy",
  "haskell",
  "java", "javascript", "json", "julia",
  "kotlin",
  "lisp", "lua",
  "makefile", "markdown", "matlab",
  "objectivec",
  "perl", "php", "python",
  "r", "ruby", "rust",
  "scala", "shell", "sql", "swift",
  "tex", "typescript",
  "verilog", "vhdl",
  "xml",
  "yaml"
];
languages.forEach((langName) => {
  // Using require() here because import() support hasn't landed in Webpack yet
  const langModule = require(`highlight.js/lib/languages/${langName}`);
  highlightjs.registerLanguage(langName, langModule);
});

export default highlightjs;
