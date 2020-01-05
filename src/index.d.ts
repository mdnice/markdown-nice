import * as React from "react";

// declare const PreviewTypes: ["pc", "mobile"];

// export declare type PreviewType = (typeof PreviewTypes)[number];

export interface MarkdownNiceProps {
  /**
   * 默认标题
   */
  defaultTitle?: string;
  // /**
  //  * 右侧预览类型 pc 或者 mobile
  //  */
  // previewType?: PreviewType;
  /**
   * 默认编辑器内容
   */
  defaultText?: string;
  /**
   * 编辑器内容监听函数
   */
  onTextChange?: (text: string) => void;
  /**
   * 是否启用用户提供的图床, 内部为图床的URL以及要显示的图床名称。
   */
  useImageHosting?: {
    url: string;
    name: string;
    isSmmsOpen: boolean;
    isQiniuyunOpen: boolean;
    isAliyunOpen: boolean;
  };
}

declare class MarkdownNice extends React.Component<MarkdownNiceProps, any> {}

export default MarkdownNice;
