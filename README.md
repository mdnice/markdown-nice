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

2、在 index.html 文件中添加下面代码

```html
<link href="https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/KaTeX/0.5.1/katex.min.css" rel="stylesheet" />
<style id="basic-theme" type="text/css"></style>
<style id="markdown-theme" type="text/css"></style>
<style id="code-theme" type="text/css"></style>
<style id="font-theme" type="text/css"></style>
```

3、示例代码

```jsx
import React from "react";
import MarkdownNice from "markdown-nice";

function App() {
  return (
    <div>
      <MarkdownNice />
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

- [ ] 自动注入 style 文件
- [ ] 提供对外的 props 配置
- [ ] 压缩代码
- [ ] 提供 ts types
