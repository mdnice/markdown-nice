export default `/*默认样式，最佳实践*/

/*全局属性*/
#nice {
  padding: 0px;
  color: #363b45;
  counter-reset: section;
  letter-spacing: 1.25px;
  line-height: 1.9;
  font-weight: normal;
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", PingFangSC, PingFangTC;
}
#nice p {
  font-size: 16px;
  margin: 18px 0px;
  color: #363b45;
  font-weight: 400;
  font-family: "Helvetica Neue", PingFangSC, PingFangTC;
  word-wrap: break-word;
  text-align: justify;
}
#nice.markdown-desc p {
  font-size: 14px;
  color: #656e82;
}
#nice .table-of-contents a {
  color: #363b45;
}
#nice ol, #nice ul {
  margin: 18px 0;
  font-family: "Helvetica Neue", PingFangSC, PingFangTC;
}
#nice ol li, #nice ul li {
  list-style-position: outside;
  padding: 4px 0;
  margin-left: 22px;
  font-size: 16px;
}
#nice ol li {
  list-style: decimal;
}
#nice ul li {
  list-style: disc;
}
#nice h1 {
  color: #000;
  text-align: center;
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 30px;
}
#nice h1:after {
  display: inline-block;
  content: " ";
  margin-left: 20px;
  vertical-align: center;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right: 15px solid rgba(255, 245, 0, 0.7);
}
#nice h1:before {
  display: inline-block;
  content: " ";
  margin-right: 20px;
  vertical-align: bottom;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right: 15px solid rgba(0, 255, 229, 0.5);
}
#nice h2 {
  margin: 50px 10px 40px 10px;
  font-size: 26px;
  text-align: center;
  font-weight: bold;
  color: #1d2027;
  line-height: 2;
  padding-bottom: 15px;
}
#nice h2 .content {
  padding: 5px 8px;
}
#nice h2:before {
  counter-increment: section;
  content: "0" counter(section);
  display: block;
  font-size: 50px;
  font-weight: 200;
  color: #0f1115;
  margin-bottom: 0px;
}
#nice h3 {
  margin: 40px 0px 20px 0px;
  font-weight: bold;
  font-size: 18px;
  color: #1d2027;
  border-left: 4px solid #00ffe5;
  padding-left: 10px;
}
#nice h4 {
  color: #363b45;
}
#nice li section {
  color: #363b45;
}
#nice blockquote {
  border-left: 3px solid rgba(144, 169, 218, 0.2);
  background: rgba(144, 169, 218, 0.05);
  font-size: 17px;
  padding: 5px 0 5px 10px;
  margin: 20px 0px;
}
#nice blockquote p {
  color: #363b45;
  font-size: 17px;
  margin: 18px 10px;
  padding: 0px 10px 0 0;
}
#nice a {
  color: #5283f0;
}
#nice strong {
  color: #283244;
  font-weight: bold;
}
#nice em {
  color: #283244;
  font-style: normal;
}
#nice em strong {
  color: #283244;
}
#nice del {
  color: #283244;
}
#nice hr {
  border-top: 2px solid rgba(144, 169, 218, 0.3);
  margin: 20px 0;
}
#nice img {
  margin: 25px 0;
}
#nice li code, #nice p code {
  background: rgba(144, 169, 218, 0.1);
  color: #345ab7;
  font-size: 90%;
  padding: 3px 5px;
  border-radius: 2px;
}
#nice table tr td, #nice table tr th {
  border: 1px solid rgba(144, 169, 218, 0.2);
}
#nice table tr th {
  background: rgba(144, 169, 218, 0.05);
}
#nice table tr:nth-child(2n) {
  background: rgba(144, 169, 218, 0.05);
}
#nice .footnote-word {
  font-size: 17px;
  font-weight: normal;
}
#nice .footnote-ref {
  font-weight: normal;
}
#nice .footnote-item {
  display: flex;
}
#nice .footnote-item p {
  color: #283244;
}

#nice figure {
  margin: 25px 0 35px;
}
#nice figure img {
  margin: 0;
}
#nice figure figcaption {
  margin-top: 10px;
  width: 100%;
  font-size: 15px;
  text-align: center;
  font-weight: 400;
  color: #b3bac8;
  font-weight: 400;
  font-family: "Helvetica Neue", PingFangSC, PingFangTC;
}
#nice h1, #nice h2, #nice h3, #nice h4, #nice h5, #nice h6 {
  margin-top: 30px;
  margin-bottom: 15px;
  font-weight: bold;
  color: black;
}
.markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6 {
  margin-top: 20px;
  color: #152137;
}
.markdown-content h1 {
  font-size: 20px;
  font-weight: 700;
}
.markdown-content h2 {
  font-size: 18px;
  font-weight: 700;
}
.markdown-content h3 {
  font-size: 16px;
  font-weight: 600;
}
.markdown-content h3 strong {
  font-weight: 700;
  font-size: 16px;
  color: #1d2027;
  border-left: 4px solid #00ffe5;
  padding-left: 10px;
}
.markdown-content h4 {
  font-size: 14px;
  font-weight: 500;
}
.markdown-content h5 {
  font-size: 14px;
}
.markdown-content h6 {
  font-size: 12px;
}
.markdown-content p {
  margin-top: 10px;
  font-size: 14;
}
.markdown-content p:first-child {
  margin-top: 0px;
}
.markdown-content a {
  font-weight: 500;
  color: #5283f0;
}
.markdown-content hr {
  margin: 10px 0;
}
.markdown-content b {
  font-weight: bold;
}
.markdown-content ul {
  margin: 10px 0;
}
.markdown-content img {
  margin: 10px 0;
}
.markdown-content br {
  margin-top: 20px;
  display: block;
  content: " ";
}
.markdown-content ul li {
  list-style: disc inside;
  font-size: 14px;
}
.markdown-content ol {
  margin: 10px 0;
}
.markdown-content ol li {
  list-style: decimal inside;
}
.markdown-content blockquote {
  background: #eef0f3;
  margin: 12px 12px 12px 0;
  padding: 12px;
  border-left: 2px solid #d5dbe4;
}
.markdown-content blockquote p {
  color: #656e82;
}
.markdown-content .out-site-link {
  padding-left: 28px;
  position: relative;
  background-color: #f6f8fb;
  border-radius: 4px;
  padding-right: 8px;
  display: inline-block;
  margin-right: 16px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #2367ff !important;
}
.markdown-content .out-site-link:before {
  content: "";
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.97154 8.99997C9.97154 10.5955 9.69321 12.0115 9.2669 13.0062C9.05329 13.5047 8.81435 13.8697 8.57958 14.1014C8.34738 14.3305 8.15227 14.3999 8.00013 14.3999C7.84799 14.3999 7.65287 14.3305 7.42068 14.1014C7.18591 13.8697 6.94696 13.5047 6.73335 13.0062C6.30704 12.0115 6.02871 10.5955 6.02871 8.99997C6.02871 7.40443 6.30704 5.98842 6.73335 4.9937C6.94696 4.49528 7.18591 4.13025 7.42068 3.89856C7.65287 3.6694 7.84799 3.6 8.00013 3.6C8.15227 3.6 8.34738 3.6694 8.57958 3.89856C8.81435 4.13025 9.05329 4.49528 9.2669 4.9937C9.69321 5.98842 9.97154 7.40443 9.97154 8.99997Z' stroke='%232367FF' stroke-width='1.2'/%3E%3Ccircle cx='7.99997' cy='8.99997' r='5.39997' stroke='%232367FF' stroke-width='1.2'/%3E%3Cpath d='M3 9H13' stroke='%232367FF' stroke-width='1.2'/%3E%3C/svg%3E%0A");
  position: absolute;
  z-index: 2;
  width: 16px;
  height: 16px;
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
}
.markdown-content.view-content br {
  margin-top: 10px;
}
.markdown-content.view-content p {
  letter-spacing: 0.6px;
}
/*
* 追加的样式
*/
/* 页脚 */
#nice .footnote-word {
  color: #1e6bb8;
  font-weight: bold;
}

#nice .footnote-ref {
  color: #1e6bb8;
  font-weight: bold;
}

#nice .footnote-item {
  display: flex;
}

#nice .footnote-num {
  display: inline;
  width: 10%; /*神奇，50px就不可以*/
  background: none;
  font-size: 80%;
  opacity: 0.6;
  line-height: 26px;
  font-family: ptima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

#nice .footnote-item p {
  display: inline;
  font-size: 14px;
  width: 90%;
  padding: 0px;
  margin: 0;
  line-height: 26px;
  color: black;
  word-break:break-all;
  width: calc(100%-50)
}

#nice sub, sup {
  line-height: 0;
}

#nice .footnotes-sep:before {
  content: "参考资料";
  display: block;
}

/* 解决公式问题 */
#nice .block-equation {
  display:block;
  text-align: center;
  overflow: auto;
  display: block;
  -webkit-overflow-scrolling: touch;
}

#nice .block-equation svg {
  max-width: 300% !important;
  -webkit-overflow-scrolling: touch;
}

#nice .inline-equation {
}

#nice .inline-equation svg {
}

#nice .imageflow-layer1 {
  margin-top: 1em;
  margin-bottom: 0.5em;
  white-space: normal;
  border: 0px none;
  padding: 0px;
  overflow: hidden;
}

#nice .imageflow-layer2 {
  white-space: nowrap;
  width: 100%;
  overflow-x: scroll;
}

#nice .imageflow-layer3 {
  display: inline-block;
  word-wrap: break-word;
  white-space: normal;
  vertical-align: middle;
  width: 100%;
}

#nice .imageflow-img {
  display: inline-block;
}

#nice .imageflow-caption {
  text-align: center;
  margin-top: 0px;
  padding-top: 0px;
  color: #888;
}

#nice .nice-suffix-juejin-container {
  margin-top: 20px !important;
}

#nice figure a {
  border: none;
}

#nice figure a img {
  margin: 0px;
}

#nice figure {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 图片链接嵌套 */
#nice figure a {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 图片链接嵌套，图片解释 */
#nice figure a + figcaption {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: -35px;
  background: rgba(0,0,0,0.7);
  color: white;
  line-height: 35px;
  z-index: 20;
}
`;
