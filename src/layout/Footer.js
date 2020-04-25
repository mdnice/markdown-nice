import React, {Component} from "react";
import {Menu, Dropdown, message} from "antd";
import {observer, inject} from "mobx-react";
import {wordCalc} from "../utils/helper";
import SitDownConverter from "../utils/sitdownConverter";
import {SITDOWN_OPTIONS} from "../utils/constant";
import SvgIcon from "../icon";

import "./Footer.css";

@inject("content")
@inject("navbar")
@inject("footer")
@observer
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      engineDesc: SITDOWN_OPTIONS[0].desc,
    };
  }

  handleMessage = () => {
    const {pasteHtml, pasteText} = this.props.footer;
    let toMarkdown = SitDownConverter.GFM;
    switch (this.state.platform) {
      case "csdn":
        toMarkdown = SitDownConverter.CSDN;
        break;
      case "wechat":
        toMarkdown = SitDownConverter.Wechat;
        break;
      case "juejin":
        toMarkdown = SitDownConverter.Juejin;
        break;
      case "zhihu":
        toMarkdown = SitDownConverter.Zhihu;
        break;
      default:
        toMarkdown = SitDownConverter.Wechat;
        break;
    }
    const markdown = toMarkdown(pasteHtml);
    const {content} = this.props.content;
    const convertContent = content.replace(pasteText, markdown);
    this.props.content.setContent(convertContent);

    // 设置粘贴检测为 false
    this.props.footer.setPasteHtmlChecked(false);

    message.success("转换成功！");
  };

  handleMenu = ({key, domEvent}) => {
    if (key === "thanks") {
      const w = window.open("about:blank");
      w.location.href = "https://github.com/mdnice/sitdown";
    } else {
      this.setState({engineDesc: key});
    }
    domEvent.stopPropagation();
  };

  render() {
    const menu = (
      <Menu onClick={this.handleMenu}>
        {SITDOWN_OPTIONS.map((option) => (
          <Menu.Item key={option.desc}>
            <div>{option.value}</div>
          </Menu.Item>
        ))}
        <Menu.Divider />
        <Menu.Item key="thanks">
          <a>SitDown 引擎提供支持</a>
        </Menu.Item>
      </Menu>
    );

    const {content, themeList} = this.props.content;
    const {templateNum} = this.props.navbar;
    const {isPasteHtmlChecked} = this.props.footer;

    const lineCount = content.split("\n").length;
    const wordCount = wordCalc(content);
    const themeName = themeList[templateNum] && themeList[templateNum].name;
    return (
      <div className="nice-footer-container">
        <p>
          行数：
          {lineCount}
        </p>
        <p>
          字数：
          {wordCount}
        </p>
        <p>
          主题：
          {themeName}
        </p>
        {isPasteHtmlChecked && (
          <div className="nice-footer-message" onClick={this.handleMessage}>
            点击使用
            <Dropdown overlay={menu} trigger={["click"]} overlayClassName="nice-footer-overlay" placement="topLeft">
              <a
                id="nice-footer-engine"
                className="nice-footer-engine"
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {this.state.engineDesc}
                <SvgIcon name="down" style={style.svgIcon} fill="#40a9ff" />
              </a>
            </Dropdown>
            将粘贴的富文本转换为 markdown
          </div>
        )}
      </div>
    );
  }
}

const style = {
  svgIcon: {
    width: "12px",
    height: "12px",
  },
};

export default Footer;
