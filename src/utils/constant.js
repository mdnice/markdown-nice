export const CLIENT_ID =
  process.env.NODE_ENV === "development"
    ? "e791aa2a7a64b3f766a2"
    : "b3a3c46bd66318367efa";
export const CLIENT_SECRET =
  process.env.NODE_ENV === "development"
    ? "e80cde65c7071286086077892f3336bc2a3f4576"
    : "dfd9fdc1da6a6b10e473280bf0a379513f1d154d";

export const PROXY =
  "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token";
export const SM_MS_PROXY =
  "https://cors-anywhere.herokuapp.com/https://sm.ms/api/upload";
export const ACCESS_TOKEN = "ACCESS_TOKEN";

export const CONTENT = "content";
export const STYLE = "style";

export const BASIC_THEME_ID = "basic-theme";
export const CODE_THEME_ID = "code-theme";
export const MARKDOWN_THEME_ID = "markdown-theme";
export const FONT_THEME_ID = "font-theme";

export const ENTER_DELAY = 0.5;
export const LEAVE_DELAY = 0.0;

export const MARKDOWN_EXAMPLE = 
`使用时请将内容替换为自己的内容。

请阅读下方文本熟悉工具使用方法。

## 1. Markdown Nice 简介

- 支持自定义样式的 Markdown 编辑器
- 支持微信公众号排版
- 内容和自定义样式浏览器中实时保存
- 欢迎登录GitHub账号，提交自定义主题

## 2. 标题

在文字写书写不同数量的\`#\`可以完成不同的标题，如下：
# 一级标题
## 二级标题
### 三级标题

## 3. 无序列表

无序列表的使用，在符号\`-\`后加空格使用。如下：

- 无序列表1
- 无序列表2
- 无序列表

如果要控制列表的层级，则需要在符号\`-\`前使用空格。如下：

- 无序列表1
- 无序列表2
  - 无序列表2.1
  - 无序列表2.2

粘贴到微信编辑器后后**无序列表整体样式与微信一致**。

## 4. 有序列表

有序列表的使用，在数字及符号\`.\`后加空格后输入内容，如下：

1. 有序列表1
2. 有序列表2
3. 有序列表3

粘贴到微信编辑器后后**有序列表整体样式与微信一致**。

## 5. 引用

引用的格式是使用符号\`>\`后面书写文字，及可以使用引用。如下：

> 读一本好书，就是在和高尚的人谈话。 ——歌德

> 雇用制度对工人不利，但工人根本无力摆脱这个制度。 ——阮一峰

## 6. 粗体和斜体

粗体的使用是在需要加粗的文字前后各加两个\`*\`。

而斜体的使用则是在需要斜体的文字前后各加一个\`*\`。

如果要使用粗体和斜体，那么就是在需要操作的文字前后各加三个\`*\`。如下：

**这个是粗体**

*这个是斜体*

***这个是粗体加斜体***

## 7. 链接

微信公众号仅支持公众号内文章链接，故而不做演示，以免体验者粘贴到公众号内无法预览。

如下：\`[你是《未来世界的幸存者》么？](https://mp.weixin.qq.com/s/s5IhxV2ooX3JN_X416nidA)\`

## 8. 图片

插入图片，如果和文字在一行则无图例，否则有图例，格式如下：

![这里写图片描述](https://i.loli.net/2019/03/30/5c9eff84d81c4.png)

**可使用上方工具上传本地图片，感谢 SM.MS 图床助力，目前图床还不够稳定，会存在粘贴失败的现象**

## 9. 代码块

如果在一个行内需要引用代码，只要用反引号引起来就好，如下：

Use the \`printf()\`  function.

在需要高亮的代码块的前一行及后一行使用三个反引号，同时第一行反引号后面表面代码块所使用的语言，如下：

\`\`\`java
// FileName: HelloWorld.java
public class HelloWorld {
  // Java 入口程序，程序从此入口
  public static void main(String[] args) {
    System.out.println("Hello,World!"); // 向控制台打印一条语句
  }
}
\`\`\`

如果想要更换代码主题，可在上方挑选，不支持代码主题自定义。

其中**微信代码主题与微信官方一致**，有以下注意事项：

- 带行号且不换行，代码大小与官方一致
- 需要在代码块处标志语言，否则无法高亮
- 粘贴到公众号后，用鼠标点代码块内外一次，完成高亮

**其他主题不带行号且换行，代码大小与编辑器一致**

## 10. 分割线

可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，同时需要在分隔线的上面空一行。如下：

---
****
___

## 11. 删除线

删除线的使用，在需要删除的文字前后各使用两个\`~\`，如下：

~~这是要被删除的内容。~~

## 12. 表格

可以使用冒号来定义表格的对齐方式，如下：

| 姓名 | 年龄 | 工作 |
| :--- |:---:| ---:|
| 小可爱 | 18 | 吃可爱多 |
| 小勇敢 | 20 | 爬勇敢树 |
| 小机智 | 22 | 看机智书 |

## 13. 脚注

脚注的使用中，会自动编号，**分为行内脚注和块脚注**，如果块脚注内容需要换行，那么**在换行内容前方加入tab或者4个空格**

行内脚注如下：

有人认为在大前端时代^[以前端开发为业务主导，https://en.wikipedia.org/wiki/Front-end_web_development]的背景下，移动端开发（Android、IOS）将逐步退出历史舞台。

块脚注如下：

全栈工程师[^全栈]在业务开发流程中起到了至关重要的作用。

[^全栈]: 掌握多种技能，并能利用多种技能独立完成产品的人

    https://baike.baidu.com/item/全栈工程师

## 14. 上标和下标

使用两个\`^\`包围可作为上标，如下：19^th^

使用两个\`~\`包围可作为下标，如下：H~2~O

## 15. 数学公式

数学公式由于转换较慢，故而放在了代码块中，需要使用可以将代码块去除

\`\`\`
行内公式使用方法，比如这个著名的公式：$E=mc^2$，源于爱因斯坦

块公式使用方法如下：

$$H(D_2) = -(\\frac{2}{4}\\ log_2 \\frac{2}{4} + \\frac{2}{4}\\ log_2 \\frac{2}{4}) = 1$$

矩阵：

$$
  \\begin{pmatrix}
  1 & a_1 & a_1^2 & \\cdots & a_1^n \\\\
  1 & a_2 & a_2^2 & \\cdots & a_2^n \\\\
  \\vdots & \\vdots & \\vdots & \\ddots & \\vdots \\\\
  1 & a_m & a_m^2 & \\cdots & a_m^n \\\\
  \\end{pmatrix}
$$
\`\`\`

公式由于微信不支持，目前的解决方案就是转成图片放到微信中，由于图床稳定性，目前还在测试

可考虑手动将转成图片的公式保存下来上传到微信上再将链接取回则万无一失

不推荐使用行内公式，微信会将图片放大
## 16. UML

不支持，推荐使用\`https://www.draw.io/\` 或 \`https://www.processon.com/\` 制作好导入图片`;

export const MARKDOWN_OPTIONS = [
  {
    id: "normal",
    name: "默认主题"
  },
  {
    id: "orange",
    name: "清新小橙"
  },
  // {
  //   id: "title1",
  //   name: "标题示例1"
  // },
  // {
  //   id: "title2",
  //   name: "标题示例2"
  // },
  {
    id: "custom",
    name: "自定义"
  }
];

export const CODE_OPTIONS = [
  {
    id: "wechat",
    name: "微信代码主题"
  },
  {
    id: "atomOneDark",
    name: "atom-one-dark"
  },
  {
    id: "atomOneLight",
    name: "atom-one-light"
  },
  {
    id: "monokai",
    name: "monokai"
  },
  {
    id: "github",
    name: "github"
  },
  {
    id: "vs2015",
    name: "vs2015"
  },
  {
    id: "xcode",
    name: "xcode"
  }
];



export const base64 = "data:image/png;base64,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"