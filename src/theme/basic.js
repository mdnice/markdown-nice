export default
`/*默认样式，最佳实践*/

/*全局属性*/
.layout {
  font-size: 16px;
  color: #3e3e3e;
  line-height: 1.6;
  word-spacing: 0px;
  letter-spacing: 0px;
  font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB",
    "Microsoft YaHei", Arial, sans-serif;
}

/*段落*/
p {
  margin: 1.5em 0px;
}

/*标题*/
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 1.5em 0px;
  font-weight: bold;
}
h1 {
  font-size: 1.6em;
}
h2 {
  font-size: 1.4em;
}
h3 {
  font-size: 1.3em;
}
h4 {
  font-size: 1.2em;
}
h5 {
  font-size: 1em;
}
h6 {
  font-size: 1em;
}

/*列表*/
ul,
ol {
  padding-left: 32px;
}
ul {
  list-style-type: disc;
}
ol {
  list-style-type: decimal;
}
li {
  margin-bottom: 0.5em;
  text-align: left;
}

/*代码块*/
pre {
  overflow-x: auto;
}
pre code {
  font-family: Consolas, Inconsolata, Courier, monospace;
  border-radius: 0px;
}
pre code span {
  font-size: 14px;
  line-height: 26px;
}

/*引用*/
blockquote {
  display: block;
  font-size: 0.9em;
  margin: 1em 0;
  overflow: auto;
  overflow-scrolling: touch;
  word-wrap: normal;
  word-break: normal;
  border-left: .25em solid #dfe2e5;
  color: #6a737d;
  padding: 0 1em;
}
blockquote p {
  margin: 0px;
}

/*链接*/
a {
  text-decoration: none;
  color: #1e6bb8;
  word-wrap: break-word;
}

/*加粗*/
strong {
  font-weight: bold;
}

/*斜体*/
em {
  font-style: italic;
}

/*加粗斜体*/
strong em {
  font-weight: bold;
}

/*删除线*/
del {
  font-style: italic;
}

/*分隔线*/
hr {
  height: 1px;
  margin: 1.5rem 0px;
  border: none;
  border-top: 1px solid #a5a5a5;
}

/*行内代码*/
code {
  word-wrap: break-word;
  padding: 2px 4px;
  border-radius: 4px;
  margin: 0 2px;
  background-color: rgba(27,31,35,.05);
}

/*图片*/
img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}

/*图片描述文字*/
figcaption {
  margin-top: 10px;
  text-align: center;
  color: #999;
  font-size: 0.7em;
}

/*表格*/
table {
  display: table;
  text-align: left;
}
tbody {
  border: 0;
}

table tr {
  border: 0;
  border-top: 1px solid #ccc;
  background-color: white;
}

table tr:nth-child(2n) {
  background-color: #F8F8F8;
}

table tr th,
table tr td {
  font-size: 1em;
  border: 1px solid #ccc;
  padding: 0.5em 1em;
  text-align: left;
  min-width: 70px;
}

table tr th {
  font-weight: bold;
  background-color: #f0f0f0;
}`
