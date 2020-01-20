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
export const IS_SYNC_SCROLL = "is_sync_scroll";
export const IS_CONTAIN_IMG_NAME = "is_contain_img_name";
export const VERSION = "version";
export const IS_PASTE_CHECK_OPEN = "is_paste_check_open";
export const IS_PRETTIER_OPEN = "is_prettier_open";
export const ALIOSS_IMAGE_HOSTING = "alioss_image_hosting";
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
};

export const RIGHT_SYMBOL = "✔️";

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
    name: "前端之巅同款",
    author: "HeyRain",
  },
  {
    id: "geekBlack",
    name: "极客黑",
    author: "hyper-xx",
  },
  {
    id: "simple",
    name: "简",
    author: "aco",
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

export const VERSION_NUM = "1.5.0";

export const VERSION_TIMELINE = [
  "2020-1-3 修复代码块换行问题，改动了本地历史和当前内容的对比界面",
  "2019-12-28 修复同步滚动和图片包含名称问题",
  "2019-12-25 增加本地历史功能，浏览器刷新后以前版本不丢失",
  "2019-12-21 修复代码块换行问题，新增上传时包含图片名选项",
  "2019-12-08 新增「图壳」免费图床，可以长期存储并且排版成功率高！下一个版本将移除其他图床的支持！仅提供组件配置项",
];
