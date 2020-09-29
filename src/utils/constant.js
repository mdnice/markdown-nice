export const CLIENT_ID = process.env.NODE_ENV === "development" ? "e791aa2a7a64b3f766a2" : "b3a3c46bd66318367efa";
export const CLIENT_SECRET =
  process.env.NODE_ENV === "development"
    ? "e80cde65c7071286086077892f3336bc2a3f4576"
    : "dfd9fdc1da6a6b10e473280bf0a379513f1d154d";

export const PROXY = "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token";
export const SM_MS_PROXY = "https://cors-anywhere.herokuapp.com/https://sm.ms/api/upload";
export const ACCESS_TOKEN = "ACCESS_TOKEN";

export const USERNAME = "username";
export const AVATAR = "avatar";
export const USERID = "userId";
export const EMAIL = "email";
export const TOKEN = "token";

export const MJX_DATA_FORMULA = "data-formula";
export const MJX_DATA_FORMULA_TYPE = "data-formula-type";

export const CONTENT = "content";
export const STYLE = "style";
export const TEMPLATE_NUM = "template_num";
export const CODE_NUM = "code_num";
export const THEME_LIST = "theme_list";
export const PREVIEW_TYPE = "preview_type";
export const IS_SYNC_SCROLL = "is_sync_scroll";
export const IS_CONTAIN_IMG_NAME = "is_contain_img_name";
export const IS_MAC_CODE = "is_mac_code";
export const NEWEST_VERSION = "newest_version";
export const ALIOSS_IMAGE_HOSTING = "alioss_image_hosting";
export const GITEE_IMAGE_HOSTING = "gitee_image_hosting";
export const GITHUB_IMAGE_HOSTING = "github_image_hosting";
export const QINIUOSS_IMAGE_HOSTING = "qiniuoss_image_hosting";
export const IMAGE_HOSTING_TYPE = "image_hosting_type";
export const BASIC_THEME_ID = "basic-theme";
export const CODE_THEME_ID = "code-theme";
export const MARKDOWN_THEME_ID = "markdown-theme";
export const FONT_THEME_ID = "font-theme";
export const LAYOUT_ID = "nice";
export const BOX_ID = "nice-rich-text-box";
export const IMAGE_HOSTING_NAMES = {
  smms: "SM.MS",
  aliyun: "阿里云",
  qiniuyun: "七牛云",
  gitee: "Gitee",
  github: "GitHub",
};

export const RIGHT_SYMBOL = "✔️";
export const EXPORT_FILENAME_SUFFIX = ".md";

export const STYLE_LABELS = ["basic-theme", "markdown-theme", "code-theme", "font-theme"];

export const ENTER_DELAY = 0.5;
export const LEAVE_DELAY = 0.0;

export const MAX_MD_NUMBER = 100000;
export const THROTTLE_MATHJAX_TIME = 1500;
export const THROTTLE_MD_RENDER_TIME = 100;

export const CODE_OPTIONS = [
  {
    id: "atomOneDark",
    macId: "macAtomOneDark",
    name: "atom-one-dark",
  },
  {
    id: "atomOneLight",
    macId: "macAtomOneLight",
    name: "atom-one-light",
  },
  {
    id: "monokai",
    macId: "macMonokai",
    name: "monokai",
  },
  {
    id: "github",
    macId: "macGithub",
    name: "github",
  },
  {
    id: "vs2015",
    macId: "macVs2015",
    name: "vs2015",
  },
  {
    id: "xcode",
    macId: "macXcode",
    name: "xcode",
  },
];

export const SITDOWN_OPTIONS = [
  {
    key: "default",
    value: "默认引擎",
    desc: "默认引擎",
  },
  {
    key: "wechat",
    value: "微信公众号 - https://mp.weixin.qq.com/",
    desc: "微信引擎",
  },
  {
    key: "zhihu",
    value: "知乎专栏 - https://zhuanlan.zhihu.com/",
    desc: "知乎引擎",
  },
  {
    key: "juejin",
    value: "掘金 - https://juejin.im/post/",
    desc: "掘金引擎",
  },
  {
    key: "csdn",
    value: "CSDN - https://blog.csdn.net/",
    desc: "CSDN引擎",
  },
];

export const TUTORIALS = [
  {
    title: "第1关：标题",
    content: `
# 一级标题

## 二级标题
    
### 三级标题`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-9/1599653309621-1.1标题.png",
  },
  {
    title: "第2关：无序列表",
    content: `
- 无序列表 1
- 无序列表 2
  - 无序列表 2.1
  - 无序列表 2.2`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-9/1599653309622-1.2无序列表.png",
  },
  {
    title: "第3关：有序列表",
    content: `
1. 有序列表 1
2. 有序列表 2
3. 有序列表 3`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-9/1599653309623-1.3有序列表.png",
  },
  {
    title: "第4关：引用",
    content: `
一级引用如下：

> ### 一级引用示例
> 
> 读一本好书。 **——歌德**
    
二级引用如下：

>> ### 二级引用示例
>>
>> 读一本好书。 **——歌德**

三级引用如下：

>>> ### 三级引用示例
>>>
>>> 读一本好书。**——歌德**`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-25/1601015511898-image.png",
  },
  {
    title: "第5关：粗体和斜体",
    content: `
**这个是粗体**

*这个是斜体*
    
***这个是粗体加斜体***`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-9/1599653309625-1.5粗体和斜体.png",
  },
  {
    title: "第6关：链接",
    content: `
[Markdown Nice最全功能介绍](https://mp.weixin.qq.com/s/lM808MxUu6tp8zU8SBu3sg)

图片还可以和链接嵌套使用，能够实现推荐卡片的效果，用法如下：

[![Markdown Nice 最全功能介绍](https://my-wechat.mdnice.com/dance.gif)](https://mp.weixin.qq.com/s/lM808MxUu6tp8zU8SBu3sg)`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-25/1601015877358-image.png",
  },
  {
    title: "第7关：分割线",
    content: `
---`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-9/1599653309626-1.7分割线.png",
  },
  {
    title: "第8关：删除线",
    content: `
~~这是要被删除的内容。~~`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-9/1599653309627-1.8删除线.png",
  },
  {
    title: "第9关：表格",
    content: `
| 姓名       | 年龄 |         工作 |
| :--------- | :--: | -----------: |
| 小可爱     |  18  |     吃可爱多 |
| 小小勇敢   |  20  |   爬棵勇敢树 |
| 小小小机智 |  22  | 看一本机智书 |`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-9/1599653309628-1.9表格.png",
  },
  {
    title: "第10关：图片",
    content: `
![这里写图片描述](https://my-wechat.mdnice.com/wechat.jpg)

![同时设置宽度和高度](https://my-wechat.mdnice.com/logo.png =150x150)
    
![只设置宽度，推荐使用百分比](https://my-wechat.mdnice.com/logo.png =40%x)`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-9/1599653309629-1.10图片.png",
  },
  {
    title: "第11关：脚注",
    content: `
[全栈工程师](是指掌握多种技能，并能利用多种技能独立完成产品的人。 "什么是全栈工程师")`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-9/1599653309632-2.1脚注.png",
  },
  {
    title: "第12关：代码块",
    content: `
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
dart，dockerfile, diff
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

diff 效果：

\`\`\`diff
+ 新增项
- 删除项
\`\`\``,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-25/1601015700784-image.png",
  },
  {
    title: "第13关：数学公式",
    content: `
行内公式：$\\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$

块公式：$$H(D_2) = -\\left(\\frac{2}{4}\\log_2 \\frac{2}{4} + \\frac{2}{4}\\log_2 \\frac{2}{4}\\right) = 1$$`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-9/1599653309648-2.3数学公式.png",
  },
  {
    title: "第14关：TOC",
    content: `
[TOC]

## 二级标题
    
### 三级标题`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-9/1599653309650-2.4TOC.png",
  },
  {
    title: "第15关：注音符号",
    content: `
Markdown Nice 这么好用，简直是{喜大普奔|hē hē hē hē}呀！`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-9/1599653309651-2.5注音符号.png",
  },
  {
    title: "第16关：横屏滑动幻灯片",
    content: `
<![蓝1](https://my-wechat.mdnice.com/blue.jpg),![绿2](https://my-wechat.mdnice.com/green.jpg),![红3](https://my-wechat.mdnice.com/red.jpg)>`,
    picture: "https://gitee.com/guanpengchn/picture/raw/master/2020-9-9/1599653309652-2.6横屏滑动幻灯片.png",
  },
];

export const THEME_API = () => {
  const currentPage = 0;
  const pageSize = 15;
  const checked = true;
  const order = "ASC";
  return `https://api.mdnice.com/themes?currentPage=${currentPage}&pageSize=${pageSize}&checked=${checked}&order=${order}`;
};
