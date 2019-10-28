export const CLIENT_ID = process.env.NODE_ENV === "development" ? "e791aa2a7a64b3f766a2" : "b3a3c46bd66318367efa";
export const CLIENT_SECRET =
  process.env.NODE_ENV === "development"
    ? "e80cde65c7071286086077892f3336bc2a3f4576"
    : "dfd9fdc1da6a6b10e473280bf0a379513f1d154d";

export const PROXY = "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token";
export const SM_MS_PROXY = "https://cors-anywhere.herokuapp.com/https://sm.ms/api/upload";
export const ACCESS_TOKEN = "ACCESS_TOKEN";

export const CONTENT = "content";
export const STYLE = "style";
export const TEMPLATE_NUM = "template_num";
export const CODE_NUM = "code_num";
export const PREVIEW_TYPE = "preview_type";
export const VERSION = "version";
export const IS_PASTE_CHECK_OPEN = "is_paste_check_open";
export const IS_PRETTIER_OPEN = "is_prettier_open";
export const ALIOSS_IMAGE_HOSTING = "alioss_image_hosting";
export const QINIUOSS_IMAGE_HOSTING = "qiniuoss_image_hosting";
export const IMAGE_HOSTING_TYPE = "image_hosting_type";
export const IMAGE_HOSTING_TYPE_OPTIONS = [
  {value: "mdnice", label: "mdnice"},
  {value: "SM.MS", label: "SM.MS"},
  {value: "阿里云", label: "阿里云"},
  {value: "七牛云", label: "七牛云"},
];

export const BASIC_THEME_ID = "basic-theme";
export const CODE_THEME_ID = "code-theme";
export const MARKDOWN_THEME_ID = "markdown-theme";
export const FONT_THEME_ID = "font-theme";

export const STYLE_LABELS = ["basic-theme", "markdown-theme", "code-theme", "font-theme"];

export const ENTER_DELAY = 0.5;
export const LEAVE_DELAY = 0.0;

export const TEMPLATE_OPTIONS = [
  {
    id: "normal",
    name: "默认主题",
    author: "zhning12",
  },
  {
    id: "orangeHeart",
    name: "橙心",
    author: "zhning12",
  },
  {
    id: "ink",
    name: "墨黑",
    author: "Mayandev",
  },
  {
    id: "purple",
    name: "姹紫",
    author: "djmaxwow",
  },
  {
    id: "cyan",
    name: "嫩青",
    author: "画手",
  },
  {
    id: "green",
    name: "绿意",
    author: "夜尽天明",
  },
  {
    id: "red",
    name: "红绯",
    author: "HeyRain",
  },
  {
    id: "wechatFormat",
    name: "WeChat-Format",
    author: "画手",
  },
  {
    id: "blue",
    name: "蓝莹",
    author: "谭淞宸",
  },
  {
    id: "scienceBlue",
    name: "科技蓝",
    author: "夜尽天明",
  },
  {
    id: "blueCyan",
    name: "兰青",
    author: "Krahets",
  },
  {
    id: "shanchui",
    name: "山吹",
    author: "ElyhG",
  },
  {
    id: "blueMountain",
    name: "蓝山",
    author: "HeyRain",
  },
  {
    id: "custom",
    name: "自定义",
    author: "",
  },
];

export const TEMPLATE_CUSTOM_NUM = TEMPLATE_OPTIONS.length - 1;

export const CODE_OPTIONS = [
  {
    id: "wechat",
    name: "微信代码主题",
  },
  {
    id: "atomOneDark",
    name: "atom-one-dark",
  },
  {
    id: "atomOneLight",
    name: "atom-one-light",
  },
  {
    id: "monokai",
    name: "monokai",
  },
  {
    id: "github",
    name: "github",
  },
  {
    id: "vs2015",
    name: "vs2015",
  },
  {
    id: "xcode",
    name: "xcode",
  },
];

export const VERSION_NUM = "1.3.1";

export const VERSION_TIMELINE = [
  "2019-10-28 修复公式 bug，新增主题「蓝山」，请重置看查看效果",
  "2019-10-27 组件化，新增预览模式，修改导航栏布局",
  "2019-10-24 修复 PWA 中的 mdnice 图床 https 问题，添加图片拖拽提示",
  "2019-10-23 支持 PWA、图片 svg 示例",
  "2019-10-20 修复公式、微信代码行、代码滚动手感等问题",
];
