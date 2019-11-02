export default `/* 根据该字体大小，统一调整文章整体大小 */
/* 间距，其他字体，代码块以及注脚 */
/* 不会控制微信代码块 */
.layout {
  font-size: 16px;
}

/* 颜色管理 */
.layout a {
  color: #3e64ff;
}
.layout p code {
  color: #e46918;
  background-color: #efefef;
}
.layout .footnote-word,
.layout .footnote-ref {
  color: #004a7c;
}
.layout .footnote-item em {
  color: #004a7c;
}

/* 统一间距 */
.layout p,
.layout section,
.layout h1,
.layout h2,
.layout h3,
.layout h4,
.layout h5,
.layout h6,
.layout pre,
.layout figure,
.layout ul,
.layout hr {
  margin: 1em 0;
  color: #333;
}

.layout {
  margin-top: -1em;
  color: #333;
  padding-top: 0;
  padding-bottom: 0;
  font-family: -apple-system,system-ui,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
}
.layout * {
  line-height: 1.6 !important;
}

.layout hr {
  border-top: 1px solid #dfe2e5
}

/* 标题调整 */
.layout h1 {
  font-size: 1.4em;
}
.layout h2 {
  font-size: 1.3em;
}
.layout h1,
.layout h2 {
  padding-bottom: .3em;
  border-bottom: 1px solid #dfe2e5;
}
.layout h3 {
  font-size: 1.2em;
}
.layout h4 {
  font-size: 1.1em;
}
.layout h5 {
  font-size: 1em;
}
.layout h6 {
  font-size: 1em;
}

/* 段落调整 */
.layout p {
  padding: 0;
  font-size: inherit;
  color: #333;
}
.layout blockquote {
  background: none;
  border-left: 4px solid #ddd;
  padding: 0 1em;
}
.layout blockquote p {
  margin: 0;
  color: #666;
}
.layout strong {
  color: #333;
}

.layout a {
  font-weight: normal;
  border-color: inherit;
}

/* 列表调整 */
.layout li section {
  margin-top: .3em;
  margin-bottom: .3em;
  font-weight: normal;
}
.layout li ul {
  margin: 0;
}

/* 代码块调整 */
.layout pre {
  border-radius: 4px;
}
.layout section pre {
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.layout p code {
  font-size: .875em;
}
.layout pre code {
  font-size: .875em;
}

.layout figure img {
  max-width: 100%;
  width: auto;
  margin: 0 auto;
}

/* table 调整 */
.layout table tr th,
.layout table tr td {
  font-size: 1em;
}

/* 注脚调整 */
.layout .footnotes-sep {
  font-size: 1.3em;
}
.layout .footnote-item {
  margin: .4em 0;
}
.layout .footnote-item * {
  line-height: 1.4 !important;
}
.layout .footnote-item p {
  margin: 0;
  font-size: .9em;
}
.layout .footnote-item em {
  font-style: normal;
  padding-left: .5em;
}
.layout .footnote-item span {
  flex: 0 0 1.5em;
  margin-right: 10px;
  font-size: .9em;
}

/* 微信默认样式修复 */
/* 微信代码块固定为 14px */
.layout pre.code-snippet__js {
  padding: 16px 0;
}

.layout pre.code-snippet__js code {
  font-size: 14px;
}`;
