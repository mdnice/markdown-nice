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
export const TEMPLATE_NUM = "template_num";
export const CODE_NUM = "code_num";

export const BASIC_THEME_ID = "basic-theme";
export const CODE_THEME_ID = "code-theme";
export const MARKDOWN_THEME_ID = "markdown-theme";
export const FONT_THEME_ID = "font-theme";

export const ENTER_DELAY = 0.5;
export const LEAVE_DELAY = 0.0;

export const TEMPLATE_OPTIONS = [
  {
    id: "normal",
    name: "默认模板"
  },
  {
    id: "orange",
    name: "清新小橙"
  },
  {
    id: "Mayandev",
    name: "Mayandev"
  },
  {
    id: "custom",
    name: "自定义"
  }
];

export const TEMPLATE_CUSTOM_NUM = TEMPLATE_OPTIONS.length - 1;

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