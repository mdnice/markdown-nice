# markdown-nice

## usage

目前仅支持 React

1、安装 markdown-nice

```shell
$ yarn add markdown-nice
```

或者

```shell
$ npm install markdown-nice --save
```

2、愉快使用

```jsx
import React from "react";
import MarkdownNice from "markdown-nice";

function App() {
  return (
    <div>
      <MarkdownNice
        previewType="pc"
        defaultTitle="Markdown Nice"
        onTitleChange={(t) => console.log("title => ", t)}
        defaultText={t}
        onTextChange={(t) => console.log("text => ", t)}
      />
    </div>
  );
}

export default App;
```

## 组件化分支开发流程

1. 初始化一个新项目
2. 在本项目下执行 `yarn link`
3. 在本项目内运行 `yarn watch`，将会自动监听 `src` 下的文件变动，自动将新代码编译到 `lib`
4. 在新项目中执行 `yarn link markdown-nice`
5. 启动新项目 `yarn start`

## todo

- [x] 自动注入 style 文件
- [x] 提供对外的 props 配置
- [x] 提供 ts types
- [ ] 压缩代码
- [ ] MathJax 更新优化
