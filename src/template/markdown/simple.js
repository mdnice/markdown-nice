export default `/* 根据该字体大小，统一调整文章整体大小 */
/* 间距，其他字体，代码块以及注脚 */
/* 不会控制微信代码块 */
#nice {
  font-size: 16px;
}

/* 颜色管理 */
#nice a {
  color: #3e64ff;
}
#nice p code {
  color: #e46918;
  background-color: #efefef;
}
#nice .footnote-word,
#nice .footnote-ref {
  color: #004a7c;
}
#nice .footnote-item em {
  color: #004a7c;
}

/* 统一间距 */
#nice p,
#nice section,
#nice h1,
#nice h2,
#nice h3,
#nice h4,
#nice h5,
#nice h6,
#nice pre,
#nice figure,
#nice ul,
#nice hr {
  margin: 1em 0;
  color: #333;
}

#nice {
  margin-top: -1em;
  color: #333;
  padding-top: 0;
  padding-bottom: 0;
  font-family: -apple-system,system-ui,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
}
#nice * {
  line-height: 1.6 !important;
}

#nice hr {
  border-top: 1px solid #dfe2e5
}

/* 标题调整 */
#nice h1 {
  font-size: 1.4em;
}
#nice h2 {
  font-size: 1.3em;
}
#nice h1,
#nice h2 {
  padding-bottom: .3em;
  border-bottom: 1px solid #dfe2e5;
}
#nice h3 {
  font-size: 1.2em;
}
#nice h4 {
  font-size: 1.1em;
}
#nice h5 {
  font-size: 1em;
}
#nice h6 {
  font-size: 1em;
}

/* 段落调整 */
#nice p {
  padding: 0;
  font-size: inherit;
  color: #333;
}
#nice blockquote {
  background: none;
  border-left: 4px solid #ddd;
  padding: 0 1em;
}
#nice blockquote p {
  margin: 0;
  color: #666;
}
#nice strong {
  color: #333;
}

#nice a {
  font-weight: normal;
  border-color: inherit;
}

/* 列表调整 */
#nice li section {
  margin-top: .3em;
  margin-bottom: .3em;
  font-weight: normal;
}
#nice li ul {
  margin: 0;
}

/* 代码块调整 */
#nice pre {
  border-radius: 4px;
}
#nice section pre {
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
}
#nice p code {
  font-size: .875em;
}
#nice pre code {
  font-size: .875em;
}

#nice figure img {
  max-width: 100%;
  width: auto;
  margin: 0 auto;
}

/* table 调整 */
#nice table tr th,
#nice table tr td {
  font-size: 1em;
}

/* 注脚调整 */
#nice .footnotes-sep {
  font-size: 1.3em;
}
#nice .footnote-item {
  margin: .4em 0;
}
#nice .footnote-item * {
  line-height: 1.4 !important;
}
#nice .footnote-item p {
  margin: 0;
  font-size: .9em;
}
#nice .footnote-item em {
  font-style: normal;
  padding-left: .5em;
}
#nice .footnote-item span {
  flex: 0 0 1.5em;
  margin-right: 10px;
  font-size: .9em;
}

/* 微信默认样式修复 */
/* 微信代码块固定为 14px */
#nice pre.code-snippet__js {
  padding: 16px 0;
}

#nice pre.code-snippet__js code {
  font-size: 14px;
}`;
