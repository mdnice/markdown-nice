import React from "react";
import MarkdownNice from "../lib/Lib";

// 编辑器默认的内容
const defaultText = `编辑器默认的内容`;
// 标题，是一个字符串
const defaultTitle = "Markdown Nice";

function App() {
  return (
    <MarkdownNice
      defaultTitle={defaultTitle}
      defaultText={defaultText}
      onTextChange={t => console.log("text => ", t)}
    />
  );
}

export default App;