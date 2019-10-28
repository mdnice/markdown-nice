export default `建议使用 **Chrome** 浏览器。

请阅读下方文本熟悉工具使用方法，本文可直接拷贝到微信中预览。

<img style="width: 120px" src="https://my-wechat.mdnice.com/mdnice/mdnice%20logo_20191007150129.png"/>

## 1. Markdown Nice 简介

- 支持自定义样式的 Markdown 编辑器
- 支持微信公众号排版
- 支持开源中国、知乎、掘金、博客园和 CSDN 等平台
- 内容和自定义样式浏览器中实时保存
- 欢迎登录 GitHub 账号，提交自定义主题

## 2. 示例文章

- <span style="color:orangered;font-weight:bold;">橙心：</span>[终于等到你，公众号排版神器](https://mp.weixin.qq.com/s/raFgkqlV5hZmrXiEWVAyfQ)
- <span style="color:#773098;font-weight:bold;">姹紫：</span>[JavaScript 数据结构与算法之美](https://mp.weixin.qq.com/s/KmoRDGdJLZ7reMfTDDaFGg)
- <span style="color:#35b378;font-weight:bold;">绿意：</span>[前端硬核面试专题之 CSS 55 问](https://mp.weixin.qq.com/s/SVKMsQtOLNqYXeT_f95FUw)
- <span style="color:rgb(248,57,41);font-weight:bold;">红绯：</span>[日常 | 我用什么工具写作？](https://mp.weixin.qq.com/s/DrvJBEWqH14atF_4O1IXFw)
- <span style="color:orangered;font-weight:bold;">Wechat-Format</span>：[Markdown Nice 新特性：阿里云图床](https://mp.weixin.qq.com/s/QPsOUkLCsvhqSicTOGaHJg)
- <span style="color:#0e88eb;font-weight:bold;">科技蓝</span>：[2019 前端秋季社招面试经历总结（二年多经验）](https://mp.weixin.qq.com/s/eDIDOESem_s93liccYK-qw)

## 3. 标题

在文字写书写不同数量的\`#\`可以完成不同的标题，如下：

# 一级标题

## 二级标题

### 三级标题

## 4. 无序列表

无序列表的使用，在符号\`-\`后加空格使用。如下：

- 无序列表 1
- 无序列表 2
- 无序列表

如果要控制列表的层级，则需要在符号\`-\`前使用空格。如下：

- 无序列表 1
- 无序列表 2
  - 无序列表 2.1
  - 无序列表 2.2

**由于微信原因，最多支持到二级列表**。

## 5. 有序列表

有序列表的使用，在数字及符号\`.\`后加空格后输入内容，如下：

1. 有序列表 1
2. 有序列表 2
3. 有序列表 3

## 6. 引用

引用的格式是在符号\`>\`后面书写文字。如下：

> 读一本好书，就是在和高尚的人谈话。 ——歌德

> 雇用制度对工人不利，但工人根本无力摆脱这个制度。 ——阮一峰

## 7. 粗体和斜体

粗体的使用是在需要加粗的文字前后各加两个\`*\`。

而斜体的使用则是在需要斜体的文字前后各加一个\`_\`。

如果要使用粗体和斜体，那么就是在需要操作的文字前后加三个\`*\`。如下：

**这个是粗体**

*这个是斜体*

***这个是粗体加斜体***

注：由于 commonmark 标准，可能会导致加粗与想象不一致，如下

**今天天气好晴朗，**处处好风光。

这个是正常现象，请参考[加粗 Issue](https://github.com/markdown-it/markdown-it/issues/410 "加粗 Issue")。

## 8. 链接

微信公众号仅支持公众号文章链接，即域名为\`https://mp.weixin.qq.com/\`的合法链接。使用方法如下所示：

对于该论述，欢迎读者查阅之前发过的文章，[你是《未来世界的幸存者》么？](https://mp.weixin.qq.com/s/s5IhxV2ooX3JN_X416nidA)

## 9. 脚注

脚注与链接的区别如下所示：

\`\`\`markdown
链接：[文字](链接)
脚注：[文字](脚注解释 "脚注名字")
\`\`\`

有人认为在[大前端时代](https://en.wikipedia.org/wiki/Front-end_web_development "Front-end web development")的背景下，移动端开发（Android、IOS）将逐步退出历史舞台。

[全栈工程师](是指掌握多种技能，并能利用多种技能独立完成产品的人。 "什么是全栈工程师")在业务开发流程中起到了至关重要的作用。

脚注内容请拉到最下面观看。

## 10. 图片

插入图片，如果是行内图片则无图例，否则有图例，格式如下：

![这里写图片描述](https://my-wechat.mdnice.com/mdnice/%E4%BA%8C%E7%BB%B4%E7%A0%81_20191007150357.gif)

支持 jpg、png、gif、svg 等图片格式，svg 文件示例如下：

![](https://my-wechat.mdnice.com/mdnice/i_am_svg_20191024083453.svg)

支持图片**拖拽和截图粘贴**到编辑器中上传，上传时使用当前选择的图床。

可使用**上方图片按钮**上传本地图片，目前共支持**4 种图床**，主要特点如下：

| 图床   | 费用     | 有效期 | 失败率 |
| ------ | -------- | ------ | ------ |
| mdnice | 免费     | 1 天   | 低     |
| SM.MS  | 免费     | 长期   | 高     |
| 阿里云 | 付费     | 自定义 | 低     |
| 七牛云 | 10G 免费 | 自定义 | 低     |

4 个图床的缺点：

| 图床   | 缺点                     |
| ------ | ------------------------ |
| mdnice | 图片只保存一天           |
| SM.MS  | 失败率高可用性很差       |
| 阿里云 | 配置繁琐，费用昂贵       |
| 七牛云 | 需要长期域名替代测试域名 |

**建议：一次性排版推荐使用 mdnice，图片需要长期管理推荐使用七牛云**。

**注：图片粘贴到微信时会自动上传微信服务器，不必担心使用上述图床会导致微信内图片丢失**。

配置文档如下：

- [Markdown Nice 新特性：阿里云图床](https://mp.weixin.qq.com/s/QPsOUkLCsvhqSicTOGaHJg)
- [Markdown Nice 新特性：七牛云图床](https://mp.weixin.qq.com/s/_ytSpvKnzEVx0l_LONdnHg)

## 11. 代码块

如果在一个行内需要引用代码，只要用反引号引起来就好，如下：

Use the \`printf()\` function.

在需要高亮的代码块的前一行及后一行使用三个反引号，同时**第一行反引号后面表面代码块所使用的语言**，如下：

\`\`\`java
// FileName: HelloWorld.java
public class HelloWorld {
  // Java 入口程序，程序从此入口
  public static void main(String[] args) {
    System.out.println("Hello,World!"); // 向控制台打印一条语句
  }
}
\`\`\`

支持以下语言种类：

\`\`\`
bash
clojure，cpp，cs，css
dart，dockerfile
erlang
go，gradle，groovy
haskell
java，javascript，json，julia
kotlin
lisp，lua
makefile，markdown，matlab
objectivec
perl，php，python
r，ruby，rust
scala，shell，sql，swift
tex，typescript
verilog，vhdl
xml
yaml
\`\`\`

如果想要更换代码主题，可在上方挑选，不支持代码主题自定义。

其中**微信代码主题与微信官方一致**，有以下注意事项：

- 带行号且不换行，代码大小与官方一致
- 需要在代码块处标志语言，否则无法高亮
- 粘贴到公众号后，用鼠标点代码块内外一次，完成高亮

**其他主题不带行号，可自定义是否换行，代码大小与当前编辑器一致**

## 12. 分割线

可以在一行中用三个以上的减号来建立一个分隔线，同时需要在分隔线的上面空一行。如下：

---

## 13. 删除线

删除线的使用，在需要删除的文字前后各使用两个\`~\`，如下：

~~这是要被删除的内容。~~

## 14. 表格

可以使用冒号来定义表格的对齐方式，如下：

| 姓名   | 年龄 |     工作 |
| :----- | :--: | -------: |
| 小可爱 |  18  | 吃可爱多 |
| 小勇敢 |  20  | 爬勇敢树 |
| 小机智 |  22  | 看机智书 |

## 15. 上标和下标

使用两个\`^\`包围可作为上标，如下：19^th^

使用两个\`~\`包围可作为下标，如下：H~2~O

## 16. 数学公式

行内公式使用方法，比如这个化学公式：$\\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$

块公式使用方法如下：

$$H(D_2) = -\\left(\\frac{2}{4}\\log_2 \\frac{2}{4} + \\frac{2}{4}\\log_2 \\frac{2}{4}\\right) = 1$$

矩阵：

$$
  \\begin{pmatrix}
  1 & a_1 & a_1^2 & \\cdots & a_1^n \\\\
  1 & a_2 & a_2^2 & \\cdots & a_2^n \\\\
  \\vdots & \\vdots & \\vdots & \\ddots & \\vdots \\\\
  1 & a_m & a_m^2 & \\cdots & a_m^n \\\\
  \\end{pmatrix}
$$

公式由于微信不支持，目前的解决方案是转成 svg 放到微信中，无需调整，矢量不失真。

目前测试如果公式量过大，在 Chrome 下会存在粘贴后无响应，但是在 Firefox 中始终能够成功。

## 17. TOC

TOC 全称为 Table of Content，列出全部标题。由于示例标题过多，需要使用将下方代码段去除即可。

\`\`\`
[[TOC]]
\`\`\`

由于微信只支持到二级列表，本工具仅支持二级标题和三级标题的显示。

## 18. 注音符号

支持注音符号，用法如下：

Markdown Nice 这么好用，简直是{喜大普奔|hē hē hē hē}呀！

## 19. HTML

支持原生 HTML 语法，除个别情况外，建议尽少使用，如下：

<span style="display:block;text-align:right;color:orangered;">橙色居右</span>
<span style="display:block;text-align:center;color:orangered;">橙色居中</span>

## 20. UML

不支持，推荐使用开源工具\`https://draw.io/\`制作后再导入图片
`;
// 要注意md结尾要有换行，否则会被认为排版有问题
