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
export const ACCESS_TOKEN = "ACCESS_TOKEN";

export const CONTENT = "content";
export const MARKDOWN_EXAMPLE = `## 1. Markdown Nice 简介

- 一款支持自定义样式的 Markdown 编辑器
- 支持微信公众号排版

## 2. 标题

在文字写书写不同数量的\`#\`可以完成不同的标题，如下：
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

## 3. 无序列表

无序列表的使用，在符号\`-\`后加空格使用。如下：

- 无序列表1
- 无序列表2
- 无序列表

如果要控制列表的层级，则需要在符号\`-\`前使用空格。如下：

- 无序列表1
- 无序列表2
  - 无序列表2.1
     - 列表内容
     - 列表内容

## 4. 有序列表

有序列表的使用，在数字及符号\`.\`后加空格几个，如下：

1. 有序列表1
2. 有序列表2
3. 有序列表3

## 5. 引用

引用的格式是使用符号\`>\`后面书写文字，及可以使用引用。如下：

> 这个是引用

> 是不是和电子邮件中的

> 引用格式很像

## 6. 粗体和斜体

粗体的使用是在需要加粗的文字前后各加两个\`*\`，而斜体的使用则是在需要斜体的文字前后各加一个\`*\`，如果要使用粗体和斜体，那么就是在需要操作的文字前后各加三个\`*\`。如下：
**这个是粗体**
*这个是斜体*
***这个是粗体加斜体***

## 8. 图片

插入互联网上图片，格式如下：
![这里写图片描述](https://octodex.github.com/images/dojocat.jpg)

## 9. 代码块

如果在一个行内需要引用代码，只要用反引号引起来就好，如下：

Use the \`printf()\`  function.

在需要高亮的代码块的前一行及后一行使用三个反引号，同时第一行反引号后面表面代码块所使用的语言，如下：

\`\`\`java
// FileName: HelloWorld.java
public class HelloWorld
{
  // Java 入口程序，程序从此入口
  public static void main(String[] args)
  {
    // 向控制台打印一条语句
    System.out.println("Hello,World!");// 向控制台打印一条语句
  }
}
\`\`\`

## 10. 分割线

可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，同时需要在分隔线的上面空一行。如下：

---
****
___

## 11. 删除线

删除线的使用，在需要删除的文字前后各使用两个\`~\`，如下：
~~Mistaken text.~~

## 12. 表格

可以使用冒号来定义表格的对齐方式，如下：

| Tables | Are | Cool |
| ------------- |:-------------:| -----:|
| col 3 is | right-aligned | $1600 |
| col 2 is | centered | $12 |
| zebra stripes | are neat | $1 |

## 13. 上标和下标

使用两个\`^\`包围可作为上标，如下：19^th^

使用两个\`~\`包围可作为下标，如下：H~2~O`;

export const THEMES_OPTIONS = [
  {
    value: "normal",
    name: "橙色主题"
  },
  {
    value: "titleDaogua",
    name: "标题倒挂"
  },
  {
    value: "bgGrid",
    name: "网格背景"
  },
  {
    value: "titleLower",
    name: "标题下边框"
  },
  {
    value: "titleLH",
    name: "标题上下边框"
  },
  {
    value: "title4",
    name: "标题四边框"
  },
  {
    value: "titleBg",
    name: "标题背景"
  },
  {
    value: "titleBgChange",
    name: "标题背景渐变"
  },
  {
    value: "titlecolor",
    name: "标题颜色"
  },
  {
    value: "titleHandsome",
    name: "标题酷酷"
  }
];

export const CODE_OPTIONS = [
  "railscasts",
  "dark",
  "darkula",
  "github",
  "github-gist",
  "gml",
  "hybird",
  "idea",
  "rainbow",
  "tomorrow",
  "vs",
  "vs2015",
  "xcode",
  "xt256",
  "zenburn"
];
