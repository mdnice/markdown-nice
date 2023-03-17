import {Client} from "@notionhq/client";
import {NotionToMarkdown} from "notion-to-md";

// notion-sdk-js不允许在浏览器端访问api，所以在cloudflare使用worker服务启动了一个代理服务
const NOTION_PROXY_URL = "https://cors.pcursor.run/https://api.notion.com";

export default async function notionToMarkdown(key, page_id) {
  const notion = new Client({
    auth: key,
    baseUrl: NOTION_PROXY_URL,
  });

  let content = "";
  const n2m = new NotionToMarkdown({notionClient: notion});
  try {
    const mdblocks = await n2m.pageToMarkdown(page_id);
    content = n2m.toMarkdownString(mdblocks);
  } catch (e) {
    console.log("Failed to convert notion page to markdown. ", e);
    return "";
  }

  return content;
}
