<div align="center">
<a href="https://mdnice.com">
<img width="200" src="./logo.png"/>
</a>
</div>
<h1 align="center">Markdown Nice</h1>

## 简介

- 支持自定义样式的 Markdown 编辑器
- 支持微信公众号排版
- 支持开源中国、知乎、稀土掘金、博客园和 CSDN 等一系列平台
- 内容和自定义样式浏览器中实时保存
- 支持上传图片、脚注、公式
- 欢迎[在线使用](https://mdnice.com/)

## 示例

- 橙心：[终于等到你，公众号排版神器](https://mp.weixin.qq.com/s/raFgkqlV5hZmrXiEWVAyfQ)
- 姹紫：[JavaScript 数据结构与算法之美](https://mp.weixin.qq.com/s/KmoRDGdJLZ7reMfTDDaFGg)
- 绿意：[前端硬核面试专题之 CSS 55 问](https://mp.weixin.qq.com/s/SVKMsQtOLNqYXeT_f95FUw)
- 红绯：[日常 | 我用什么工具写作？](https://mp.weixin.qq.com/s/DrvJBEWqH14atF_4O1IXFw)
- Wechat-Format：[Markdown Nice 新特性：阿里云图床](https://mp.weixin.qq.com/s/QPsOUkLCsvhqSicTOGaHJg)
- 科技蓝：[2019 前端秋季社招面试经历总结（二年多经验）](https://mp.weixin.qq.com/s/eDIDOESem_s93liccYK-qw)

> 欢迎提供更多文章示例~~

## 开发文档

开发文档请参考本项目的[wiki](https://github.com/zhning12/markdown-nice/wiki/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3)

## 关于

目前 mdnice 已经有了一定量的用户，故而组建了**微信群**，欢迎反馈意见和公众号大佬们一起交流，关注公众号回复「排版」拉你入群。

<img width="250px" src="https://my-wechat.mdnice.com/wechat/wechat_gongzhognhao_20191014013348.gif"/>

欢迎打赏哟，您的支持是我最大的动力！

<img width="250px" src="https://my-wechat.mdnice.com/mdnice/bonus_20191007150639.png"/>

## 组件使用

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

// 编辑器默认的内容
const defaultText = `编辑器默认的内容`;
// 标题，是一个字符串
const defaultTitle = "mdnice";

function App() {
  return (
    <MarkdownNice
      defaultTitle={defaultTitle}
      previewType="mobile"
      onTitleChange={(t) => console.log("title => ", t)}
      defaultText={defaultText}
      onTextChange={(t) => console.log("text => ", t)}
    />
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
- [x] MathJax 更新优化
- [ ] 切换预览模式的按钮
