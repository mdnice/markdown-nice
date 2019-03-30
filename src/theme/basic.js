export default
`/*默认样式，最佳实践*/

/*全局属性*/
.layout {
  font-size: 16px;
  color: #3e3e3e;
  padding: 10px;
  line-height: 1.6;
  word-spacing: 0px;
  letter-spacing: 0px;
  font-family: ptima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

/*段落*/
p {
  font-size: 16px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 0;
  line-height: 26px;
  color: #3e3e3e;
}

/*标题*/
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #3e3e3e;
}
h1 {
  font-size: 28px;
}
h2 {
  font-size: 24px;
}
h3 {
  font-size: 20px;
}
h4 {
  font-size: 18px;
}
h5 {
  font-size: 16px;
}
h6 {
  font-size: 16px;
}

/*列表*/
ul,
ol {
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 20px;
  color: #3e3e3e;
}
ul {
  list-style-type: disc;
}
ol {
  list-style-type: decimal;
}
li {
  margin-top: 5px;
  margin-bottom: 5px;
  line-height: 26px;
  text-align: left;
  color: #3e3e3e;
}



/*引用*/
blockquote {
  display: block;
  font-size: 0.9em;
  overflow: auto;
  overflow-scrolling: touch;
  word-wrap: normal;
  word-break: normal;
  border-left: 3px solid rgba(0, 0, 0, 0.4);
  background: rgba(0, 0, 0, 0.05);
  color: #6a737d;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
}

blockquote p {
  margin: 0px;
  color: #3e3e3e;
  line-height: 26px;
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
  color: #3e3e3e;
}

/*斜体*/
em {
  font-style: italic;
  color: #3e3e3e;
}

/*加粗斜体*/
strong em {
  font-weight: bold;
  color: #3e3e3e;
}

/*删除线*/
del {
  font-style: italic;
  color: #3e3e3e;
}

/*分隔线*/
hr {
  height: 1px;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-top: 1px solid #3e3e3e;
}

/*代码块*/
pre {
  overflow-x: auto;
}
pre code {
  font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
  border-radius: 0px;
}
pre code span {
  font-size: 14px;
  line-height: 26px;
}

/*行内代码*/
code {
  font-size: 14px;
  word-wrap: break-word;
  padding: 2px 4px;
  border-radius: 4px;
  margin: 0 2px;
  background-color: rgba(27,31,35,.05);
  font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
}

/*图片*/
img {
  display: block;
  margin: 0 auto;
  width: 80%;
}

/*图片*/
figure {
  mairgin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
}

/*图片描述文字*/
figcaption {
  margin-top: 5px;
  text-align: center;
  color: #888;
  font-size: 14px;
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
  font-size: 16px;
  border: 1px solid #ccc;
  padding: 5px 15px;
  text-align: left;
  min-width: 70px;
}

table tr th {
  font-weight: bold;
  background-color: #f0f0f0;
}`
