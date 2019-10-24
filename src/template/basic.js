export default `/*默认样式，最佳实践*/

/*全局属性*/
.layout {
  font-size: 16px;
  color: black;
  padding: 10px;
  /* 解决，首行的 margin-top 不应该有 */
  margin-top: -1em;
  line-height: 1.625;
  word-spacing: 0px;
  letter-spacing: 0px;
  word-break: break-word;
  word-wrap: break-word;
  text-align: left;
  font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

/* 除标题外的块状统一间距 */
p,
ul,
ol,
dl,
blockquote,
table,
pre,
section,
figure,
hr {
  margin: 1em 0;
}

/*段落*/
p {
  /* font-size: 16px; */
  /* 26/16 = 1.625 fix: 字体变大不会重叠 */
  line-height: 1.625;
  color: black;
}

/*标题*/
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 40px;
  margin-bottom: 20px;
  font-weight: bold;
  color: black;
}
h1 {
  /* 28/16 = 1.75 */
  font-size: 1.75em;
}
h2 {
  /* 24/16 = 1.5 */
  font-size: 1.5em;
}
h3 {
  /* 20/16 = 1.25 */
  font-size: 1.25em;
}
h4 {
  /* 18/16 = 1.125 */
  font-size: 1.125em;
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
  padding-left: 25px;
  color: black;
}
ul {
  list-style-type: disc;
}
ul ul {
  list-style-type: square;
}

ol {
  list-style-type: decimal;
}

li section {
  /* 行高会默认继承 */
  /* line-height: 26px; */
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: left;
  color: rgb(1,1,1); // 只要是纯黑色微信编辑器就会把color这个属性吞掉。。。
  font-weight: 500;
}

/*微信代码样式*/
.code-snippet__fix .code-snippet__line-index li {
  margin-top: 5px;
  margin-bottom: 5px;
  line-height: 26px;
  text-align: left;
  color: black;
}

/*引用*/
blockquote {
  display: block;
  font-size: 0.9em;
  overflow: auto;
  overflow-scrolling: touch;
  border-left: 3px solid rgba(0, 0, 0, 0.4);
  background: rgba(0, 0, 0, 0.05);
  color: #6a737d;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 10px;
}

blockquote p {
  margin: 0px;
  color: black;
  /* line-height: 26px; */
}

.table-of-contents a {
  border: none;
  color: black;
  font-weight: normal;
}

/*链接*/
a {
  text-decoration: none;
  color: #1e6bb8;
  word-wrap: break-word;
  font-weight: bold;
  border-bottom: 1px solid #1e6bb8;
}

/*加粗*/
strong {
  font-weight: bold;
  color: black;
}

/*斜体*/
em {
  font-style: italic;
  color: black;
}

/*加粗斜体*/
strong em {
  font-weight: bold;
  color: black;
}

/*删除线*/
del {
  font-style: italic;
  color: black;
}

/*分隔线*/
hr {
  height: 1px;
  border: none;
  border-top: 1px solid black;
}

/*代码块*/
pre code {
  display: -webkit-box !important;
  font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
  border-radius: 0px;
  /* 14/16 = 0.875 */
  font-size: 0.875em;
  padding: 2px;
  -webkit-overflow-scrolling: touch;
}

/*行内代码*/
p code, li code{
  /* 14/16 = 0.875 */
  font-size: 0.875em;
  word-wrap: break-word;
  padding: 2px 4px;
  border-radius: 4px;
  margin: 0 2px;
  color: #1e6bb8;
  background-color: rgba(27,31,35,.05);
  font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
  word-break: break-all;
}

/*图片*/
img {
  display: block;
  margin: 0 auto;
  width: 100%;
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
  font-size: 1em;
  border: 1px solid #ccc;
  padding: 5px 10px;
  text-align: left;
}

table tr th {
  font-weight: bold;
  background-color: #f0f0f0;
}

/* 微信代码块 */
.code-snippet__fix {
  word-wrap: break-word !important;
  font-size: 14px;
  margin: 10px 0;
  display: block;
  color: #333;
  position: relative;
  background-color: rgba(0,0,0,0.03);
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  display: flex;
  line-height: 20px;
}
.code-snippet__fix pre {
  margin-bottom: 10px;
  margin-top: 0px;
}
.code-snippet__fix .code-snippet__line-index {
  counter-reset: line;
  flex-shrink: 0;
  height: 100%;
  padding: 1em;
  list-style-type: none;
  padding: 16px;
  margin: 0;
}
.code-snippet__fix .code-snippet__line-index li {
  list-style-type: none;
  text-align: right;
  margin: 0;
}
.code-snippet__fix .code-snippet__line-index li::before {
  min-width: 1.5em;
  text-align: right;
  left: -2.5em;
  counter-increment: line;
  content: counter(line);
  display: inline;
  color: rgba(0,0,0,0.3);
}
.code-snippet__fix pre {
  overflow-x: auto;
  padding: 16px;
  padding-left: 0;
  white-space: normal;
  flex: 1;
  -webkit-overflow-scrolling: touch;
}
.code-snippet__fix code {
  text-align: left;
  font-size: 14px;
  display: block;
  white-space: pre;
  display: flex;
  position: relative;
  font-family: Consolas,"Liberation Mono",Menlo,Courier,monospace;
  padding: 0px;
}


/* 公式注释 */
.katex-mathml {
  display: none;
}

.katex {
  display: inline-block;
  line-height: 28px;
}

.katex-inline {
  display: inline;
}

.math-img-inline {
  display: inline-block;
  line-height: inherit;
  height: 18px;
  width: auto;
  max-width: 100%;
  vertical-align: middle
}

.math-img-block {
  max-width: 100%;
  width: auto;
}

.footnote-word {
  color: #1e6bb8;
  font-weight: bold;
}

.footnote-ref {
  color: #1e6bb8;
  font-weight: bold;
}

.footnote-item {
  display: flex;
  /* 14/16 = 0.875 */
  font-size: 0.875em;
}

.footnote-num {
  /* display: inline; */
  /* width: 10%; 神奇，50px就不可以*/
  /* 容器是 flex 用 flex 定义 50px 有点宽 */
  /* line-height: 26px; */
  flex: 0 0 40px;
  text-align: right;
  padding-right: 10px;
  background: none;
  opacity: 0.6;
  font-family: ptima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 1em;
  line-height: 1.625;
}

.footnote-item p {
  /* display: inline; */
  /* width: 90%; */
  /* line-height: 26px; */
  /* width: calc(100%-50) */
  flex: auto;
  margin: 0;
  color: black;
  word-break:break-all;
  font-size: 1em;
  line-height: 1.625;
}

sub, sup {
  line-height: 0;
}

/* 解决公式问题 */
.block-equation {
  display:block;
  text-align: center;
  overflow: auto;
  display: block;
}

.block-equation svg {
  max-width: 300% !important;
}

.inline-equation {
}

.inline-equation svg {
}`;
