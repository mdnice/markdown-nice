<div align="center">
<a href="https://mdnice.com">
<img width="200" src="./logo.png"/>
</a>
</div>
<h1 align="center">Markdown Nice</h1>

## 简介

- 支持自定义样式的 Markdown 编辑器
- 支持微信公众号、知乎和稀土掘金
- 更多用户和开发者文档请参考 [Markdown Nice Docs](https://docs.mdnice.com/)
- 欢迎[在线使用](https://mdnice.com/)

## 示例

- 橙心：[终于等到你，公众号排版神器](https://mp.weixin.qq.com/s/raFgkqlV5hZmrXiEWVAyfQ)
- 姹紫：[JavaScript 数据结构与算法之美](https://mp.weixin.qq.com/s/KmoRDGdJLZ7reMfTDDaFGg)
- 绿意：[前端硬核面试专题之 CSS 55 问](https://mp.weixin.qq.com/s/SVKMsQtOLNqYXeT_f95FUw)
- 红绯：[日常 | 我用什么工具写作？](https://mp.weixin.qq.com/s/DrvJBEWqH14atF_4O1IXFw)
- Wechat-Format：[Markdown Nice 新特性：阿里云图床](https://mp.weixin.qq.com/s/QPsOUkLCsvhqSicTOGaHJg)
- 科技蓝：[2019 前端秋季社招面试经历总结（二年多经验）](https://mp.weixin.qq.com/s/eDIDOESem_s93liccYK-qw)

> 欢迎提供更多文章示例~~

## 组件使用

### React

1、安装 markdown-nice

```shell
$ yarn add markdown-nice
```

或者

```shell
$ npm install markdown-nice --save
```

若 npm install 过慢，建议使用yarn作为包管理工具。

其中的 mathjax 包下载速度可能比较慢，请耐心等待，或者选择网络好的地方进行尝试。

2、愉快使用

```jsx
import React from "react";
import MarkdownNice from "markdown-nice";

// 编辑器默认的内容
const defaultText = `编辑器默认的内容`;
// 标题，是一个字符串
const defaultTitle = "Markdown Nice";

function App() {
  return (
    <MarkdownNice
      defaultTitle={defaultTitle}
      defaultText={defaultText}
      onTextChange={(t) => console.log("text => ", t)}
    />
  );
}

export default App;
```

更多开发者文档请参考 [Markdown Nice Docs](https://docs.mdnice.com/)

### Vue(临时)

当前组件没有正式支持 Vue，可以使用 vuera 在 Vue 中引入组件，参考[示例](https://github.com/ElyhG/vuera)。

## 关于

mdnice 社区组建了**微信用户群**，欢迎反馈意见和公众号大佬们一起交流，关注公众号回复「排版」拉你入群。

同时也欢迎打赏哟，您的支持是我们最大的动力！

| 入群码                                                                                                | 打赏码                                                                                  |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| <img width="360px" src="./group.png"/> | <img width="250px" src="./bonus.png"/> |
