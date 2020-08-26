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

export const CODE_OPTIONS = [
  {
    id: "wechat",
    name: "微信代码主题",
  },
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

export const THEME_API = () => {
  const currentPage = 0;
  const pageSize = 15;
  const checked = true;
  const order = "ASC";
  return `https://api.mdnice.com/themes?currentPage=${currentPage}&pageSize=${pageSize}&checked=${checked}&order=${order}`;
};
