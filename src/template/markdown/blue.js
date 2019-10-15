export default `/* 全局属性 */

.layout {
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  word-break: break-all;
}

/* 标题 */

h1 {
  font-size: 1.7em;
  font-weight: normal;
  border-bottom: 2px solid hsl(216, 100%, 68%);
}

h1 span {
  background: hsl(216, 100%, 68%);
  color: white;
  padding: 3px 10px;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  margin-right: 3px;
}

h2 {
  font-weight: normal;
  color: #333;
  font-size: 1.4em;
  border-bottom: 1px solid hsl(216, 100%, 68%);
}

h2 span {
  border-bottom: 1px solid hsl(216, 100%, 68%);
}

h3 {
  font-weight: normal;
  color: #333;
  font-size: 1.2em;
}

/* 特殊规定：
 * h4 → 摘要
 * h5 → 强调
 * h6 → 序号
 * em → 高亮
 */

h4 {
  font-weight: normal;
  font-size: 1em;
  width: 80%;
  border: 1px solid hsl(216, 100%, 68%);
  border-top: 4px solid hsl(216, 100%, 68%);
  padding: 10px;
  margin: 30px auto;
  color: #333;
}

h5 {
  font-weight: normal;
  font-size: 1.3em;
  text-align: center;
  background: hsl(216, 100%, 68%);
  border: 3px double #fff;
  width: 80%;
  padding: 10px;
  margin: 30px auto;
  color: #fff;
}

h6 {
  font-size: 1.5em;
  font-weight: normal;
  color: hsl(216, 100%, 68%);
  border-bottom: 1px solid hsl(216, 100%, 68%);
}

em {
  font-style: normal;
  font-weight: normal;
  color: white;
  background: hsl(244, 100%, 75%);
  padding: 2px 4px;
	margin: 0px 2px;
}

/* 其他块元素 */

ol,
ul {
  padding-left: 2em;
}

hr {
  width: 90%;
  margin: 1.5em auto;
  border-top: 2px dashed hsl(216, 100%, 68%);
}

table {
  margin: 1.5em auto;
  width: auto;
}

img {
  width: 90%;
  margin: 0 auto;
  box-shadow: #CCC 0 10px 15px;
}

blockquote {
  background: #f9f9f9;
  border-left-color: hsl(216, 100%, 68%);
}

blockquote p {
  color: #999;
  padding: 3px 0;
}

a {
  color: hsl(187, 100%, 45%);
  font-weight: normal;
  border-bottom-color: hsl(187, 100%, 45%);
}

strong {
  color: hsl(216, 80%, 44%);
}

s,
del {
  color: #999;
}

p,
li,
li span,
h4,
table tr td {
  color: #666;
}

table tr th {
  color: #333;
  font-weight: normal;
}

p code,
li code {
  color: hsl(216, 100%, 68%);
}

sup {
  line-height: 0;
}

.footnote-word,
.footnote-ref {
  font-weight: normal;
  color: hsl(187, 100%, 45%);
}

.footnotes-sep {
  font-family: inherit;
}

.footnote-num {
  font-family: inherit;
}

.footnote-item p {
  color: #666;
}

.footnote-item p em {
  color: #999;
  background: transparent;
}

/* 行间公式
 * 最大宽度 max-width: 300% !important;
 */
.block-equation svg {
}

/* 行内公式
 */
.inline-equation svg {  
}`;
