export default `/* 全局属性
 * 页边距 padding: 30px;
 * 全文字体 font-family: ptima-Regular;
 * 英文换行 word-break: break-all;
 */
#nice {
}

/* 段落，下方未标注标签参数均同此处
 * 上边距 margin-top: 5px;
 * 下边距 margin-bottom: 5px;
 * 行高 line-height: 26px;
 * 词间距 word-spacing: 3px;
 * 字间距 letter-spacing: 3px;
 * 对齐 text-align: left;
 * 颜色 color: #3e3e3e;
 * 字体大小 font-size: 16px;
 * 首行缩进 text-indent: 2em;
 */
#nice p {
  line-height: 1.6;
  color: #3f3f3f;
  font-size: 16px;
  margin: 10px 0px;
}

/* 一级标题 */
#nice h1 {
}

/* 一级标题内容 */
#nice h1 .content {
}

/* 一级标题修饰 请参考有实例的主题 */
#nice h1:after {
}

/* 二级标题 */
#nice h2 {
  margin: 80px 10px 40px 10px;
  text-align: center;
  font-weight: normal;
  color: #3f3f3f;
  font-size: 140%;
}

/* 二级标题内容 */
#nice h2 .content {
}

/* 二级标题修饰 请参考有实例的主题 */
#nice h2:after {
}

/* 三级标题 */
#nice h3 {
  margin: 40px 0px 20px 0px;
  font-weight: bold;
  line-height: 1.5;
  color: #3f3f3f;
  font-size: 120%;
}

/* 三级标题内容 */
#nice h3 .content {
}

/* 三级标题修饰 请参考有实例的主题 */
#nice h3:after {
}

/* 无序列表整体样式
 * list-style-type: square|circle|disc;
 */
#nice ul {
}

/* 有序列表整体样式
 * list-style-type: upper-roman|lower-greek|lower-alpha;
 */
#nice ol {
}

/* 列表内容，不要设置li
 */
#nice li section {
}

/* 引用
* 左边缘颜色 border-left-color: black;
* 背景色 background: gray;
*/
#nice blockquote {
  color: rgb(91,91,91);
  border-left: 3px solid rgb(158,158,158);
  background: rgba(158, 158, 158, 0.1);
  padding: 1px 0 1px 10px;
  margin: 20px 0px;
}

/* 引用文字 */
#nice blockquote p {
  color: #3f3f3f;
  line-height: 1.5;
  font-size: 16px;
  margin: 10px;
  padding: 0px;
}

/* 链接 
 * border-bottom: 1px solid #009688;
 */
#nice a {
  color: #ff3502;
  border-bottom: 1px solid #ff3502;
}

/* 加粗 */
#nice strong {
  color: #ff3502;
  line-height: 1.5;
  font-size: 16px;
}

/* 斜体 */
#nice em {
}

/* 加粗斜体 */
#nice em strong {
}

/* 删除线 */
#nice del {
}

/* 分隔线
* 粗细、样式和颜色
* border-top: 1px solid #3e3e3e;
*/
#nice hr {
}

/* 图片
* 宽度 width: 80%;
* 居中 margin: 0 auto;
* 居左 margin: 0 0;
*/
#nice img {
}

/* 图片描述文字 */
#nice figcaption {
}

/* 行内代码 */
#nice p code, #nice li code {
  background: #f8f5ec;
  color: #ff3502;
  line-height: 1.5;
  font-size: 90%;
  padding: 3px 5px;
  border-radius: 2px;
}

/* 非微信代码块
 * 代码块不换行 display: -webkit-box !important;
 * 代码块换行 display: block;
 */
#nice pre code {
}

/*
 * 表格内的单元格
 * 字体大小 font-size: 16px;
 * 边框 border: 1px solid #ccc;
 * 内边距 padding: 5px 10px;
 */
#nice table tr th,
#nice table tr td {
}

/* 脚注文字 */
#nice .footnote-word {
  color: #ff3502;
  font-size: 16px;
  line-height: 1.5;
  font-weight: normal;
}

/* 脚注上标 */
#nice .footnote-ref {
  color: #ff3502;
  font-weight: normal;
}

/* "参考资料"四个字 */
#nice .footnotes-sep {
}

/* 参考资料编号 */
#nice .footnote-num {
}

/* 参考资料文字 */
#nice .footnote-item p { 
}

/* 参考资料解释 */
#nice .footnote-item p em {
}

/* 行间公式
 * 最大宽度 max-width: 300% !important;
 */
#nice .block-equation svg {
}

/* 行内公式
 */
#nice .inline-equation svg {  
}`;
