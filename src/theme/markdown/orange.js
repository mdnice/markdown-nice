export default
`/*全局属性*/
.layout {
  background-image: linear-gradient(
      90deg,
      rgba(50, 0, 0, 0.05) 3%,
      rgba(0, 0, 0, 0) 3%
    ),
    linear-gradient(360deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%);
  background-size: 20px 20px;
  background-position: center center;
}

/*段落*/
p {
}

/*一级标题*/
h1 {
}

/*一级标题内容*/
h1 span {
}

/*一级标题修饰*/
h1:after {
}

/*二级标题*/
h2 {
}

/*二级标题内容*/
h2 span {
}

/*二级标题修饰*/
h2:after {
}

/*三级标题*/
h3 {
  border-bottom: 2px solid rgb(239, 112, 96);
  font-size: 1.3em;
}

/*三级标题内容*/
h3 span {
  display: inline-block;
  font-weight: normal;
  background: rgb(239, 112, 96);
  color: #ffffff;
  padding: 3px 10px 1px;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  margin-right: 3px;
}

/*三级标题修饰*/
h3:after {
  display: inline-block;
  content: " ";
  vertical-align: bottom;
  border-bottom: 36px solid #efebe9;
  border-right: 20px solid transparent;
}

/*四级标题*/
h4 {
}

/*四级标题内容*/
h4 span {
}

/*四级标题修饰*/
h4:after {
}

/*五级标题*/
h5 {
}

/*五级标题内容*/
h5 span {
}

/*五级标题修饰*/
h5:after {
}

/*六级标题*/
h6 {
}

/*六级标题内容*/
h6 span {
}

/*六级标题修饰*/
h6:after {
}

/*无序列表*/
ul {
}

/*有序列表*/
ol {
}

/*列表内容*/
li {
}

/*代码块*/
pre {
}

/*代码块内代码*/
pre code {
}

/*代码块内文字*/
pre code span {
}

/*行内代码*/
code {
  word-wrap: break-word;
  padding: 2px 4px;
  border-radius: 4px;
  margin: 0 2px;
  color: #f82375; /*更改默认的颜色*/
  background: #f8f8f8;
}

/*行内代码文字*/
code span {
}

/*引用*/
blockquote {
  padding: 15px 15px 15px 1rem;
  color: #000000;
  border-left: 5px solid rgb(239, 112, 96);
  background: #efebe9;
}

/*引用文字*/
blockquote p {
}

/*链接*/
a {
}

/*加粗*/
strong {
  color: #e96900;
}

/*斜体*/
em {
  color: #6200ea;
}

/*加粗斜体*/
strong em {
  color: #c51162;
}

/*删除线*/
del {
  color: #2962ff;
}

/*分隔线*/
hr {
  border-top: 1px dashed #a5a5a5;
}

/*图片*/
img {
  /* margin: 0 auto; */ /*水平居中*/
  /* margin:0 0; */ /*水平居左*/
}

/*图片描述文字*/
figcaption {
  /* text-align: center; */ /*水平居中*/
  /* text-align:left;  */ /*水平居左*/
}

/*表格*/
table {
}

/*表头*/
thead {
}

/*表体*/
tbody {
}

/*表格行*/
table tr {
}

/*表格间隔行*/
table tr:nth-child(2n) {
}

/*表头格子*/
table tr th {
}

/*表体格子*/
table tr td {
}`
