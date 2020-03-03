import {message} from "antd";
import prettier from "prettier/standalone";
import prettierMarkdown from "prettier/parser-markdown";
import axios from "axios";
import FormData from "form-data";

const wrapChar = /windows|win32/i.test(navigator.userAgent) ? "\r\n" : "\n";

const handleWechatOuterLink = (content) => {
  const linkImgReg = /(!)*\[.*?\]\(((?!mp.weixin.qq.com).)*?\)/g;
  const res = content.match(linkImgReg); // 匹配到图片、链接和脚注

  if (res === null) {
    return content;
  }

  const footReg = /.*?\(.*?"(.*?)".*?\)/;
  const filterRes = res.filter((val) => {
    const comment = val.match(footReg);
    if (val[0] === "!") {
      return false;
    }
    if (comment && comment[1] !== "") {
      return false;
    }
    return true;
  }); // 过滤掉图片和脚注

  if (filterRes.length > 0) {
    filterRes.forEach((val) => {
      const linkReg = /\[(.*?)\]\((.*?)\)/; // 匹配链接中具体的值
      const matchValue = val.match(linkReg);
      const name = matchValue[1];
      const url = matchValue[2].trim();

      const newVal = `[${name}](${url} "${name}")`;
      console.log(content);
      content = content.replace(val, newVal);
      console.log(content);
    });
    return content;
  } else {
    return content;
  }
};

export const parseLinkToFoot = (content, store) => {
  content = handleWechatOuterLink(content);
  content = content.replace(/([\u4e00-\u9fa5])\$/g, "$1 $");
  content = content.replace(/\$([\u4e00-\u9fa5])/g, "$ $1");
  store.setContent(content);
  message.success("微信外链转脚注完成！");
};

const handlePrettierDoc = (content) => {
  const prettierRes = prettier.format(content, {
    parser: "markdown",
    plugins: [prettierMarkdown],
  });
  return prettierRes;
};

export const formatDoc = (content, store) => {
  content = handlePrettierDoc(content);
  content = content.replace(/([\u4e00-\u9fa5])\$/g, "$1 $");
  content = content.replace(/\$([\u4e00-\u9fa5])/g, "$ $1");
  store.setContent(content);
  message.success("格式化文档完成！");
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    callback(array[index]);
  }
}

async function getNewUrl(imageUrl) {
  const response = await axios.get(imageUrl);
  const imageBuffer = Buffer.from(response.data, "utf-8");
  const formData = new FormData();
  formData.append("file", imageBuffer);
  const postUrl = `https://imgkr.com/api/files/upload`;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const result = await axios.post(postUrl, formData, config);
  console.log(result);
  return result.data.data;
}

const replaceImageUrls = async (content) => {
  const linkImgReg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)\.(jpg|gif|png)/g;
  const res = content.match(linkImgReg); // 匹配图片地址
  if (res === null) {
    return content;
  }

  const filterRes = res.filter((val) => {
    if (val.indexOf("mmbiz.qpic.cn") > 0 || val.indexOf("imgkr.cn-bj.ufileos.com") > 0) {
      return false;
    }
    return true;
  }); // 过滤掉微信和图壳的图片地址

  if (filterRes.length > 0) {
    await asyncForEach(filterRes, async (val) => {
      console.log(val);
      const newUrl = await getNewUrl(val);
      content = content.replace(val, newUrl);
    });
    return content;
  } else {
    return content;
  }
};

export async function imageReplace(content, store) {
  content = await replaceImageUrls(content);
  store.setContent(content);
  message.success("图片链接替换完成！");
}

export const bold = (editor, selection) => {
  editor.replaceSelection(`**${selection}**`);
  const cursor = editor.getCursor();
  cursor.ch -= 2;
  editor.setCursor(cursor);
};

export const del = (editor, selection) => {
  editor.replaceSelection(`~~${selection}~~`);
  const cursor = editor.getCursor();
  cursor.ch -= 2;
  editor.setCursor(cursor);
};

export const italic = (editor, selection) => {
  editor.replaceSelection(`*${selection}*`);
  const cursor = editor.getCursor();
  cursor.ch -= 1;
  editor.setCursor(cursor);
};

export const code = (editor, selection) => {
  editor.replaceSelection(`${wrapChar}\`\`\`${wrapChar}${selection}${wrapChar}\`\`\`${wrapChar}`);
  const cursor = editor.getCursor();
  cursor.line -= 2;
  editor.setCursor(cursor);
};

export const inlineCode = (editor, selection) => {
  editor.replaceSelection(`\`${selection}\``);
  const cursor = editor.getCursor();
  cursor.ch -= 1;
  editor.setCursor(cursor);
};

export const h1 = (editor, selection) => {
  editor.replaceSelection(`# ${selection}`);
};

export const h2 = (editor, selection) => {
  editor.replaceSelection(`## ${selection}`);
};

export const h3 = (editor, selection) => {
  editor.replaceSelection(`### ${selection}`);
};
