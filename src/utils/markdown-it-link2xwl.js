import {IS_LINK_2_XWL} from "./constant";

("use strict");

// Adapted from https://github.com/markdown-it/markdown-it/blob/fbc6b0fed563ba7c00557ab638fd19752f8e759d/docs/architecture.md

function applyAttributes(idx, tokens, attributes) {
  var href = tokens[idx].attrs[tokens[idx].attrIndex("href")][1];
  Object.keys(attributes).forEach(function(attr) {
    var attrIndex;
    var value = attributes[attr];

    if (attr === "className") {
      // when dealing with applying classes
      // programatically, some programmers
      // may prefer to use the className syntax
      attr = "class";
    }

    // go?to=https://new.qq.com/omn/20201027/20201027A04Q7A00.html
    if (attr === "data-miniprogram-path") {
      value = "go?to=" + encodeURIComponent(href);
    }

    attrIndex = tokens[idx].attrIndex(attr);

    if (attrIndex < 0) {
      // attr doesn't exist, add new attribute
      tokens[idx].attrPush([attr, value]);
    } else {
      // attr already exists, overwrite it
      tokens[idx].attrs[attrIndex][1] = value; // replace value of existing attr
    }
  });
}

export default function markdownitLinkAttributes(md, configs) {
  configs = {
    attrs: {
      "data-miniprogram-appid": "wxe81de4a47ea1ab33",
      "data-miniprogram-path": "",
      "data-miniprogram-nickname": "小外链",
      "data-miniprogram-type": "text",
      "data-miniprogram-servicetype": "",
    },
  };

  if (!configs) {
    configs = [];
  } else {
    configs = Array.isArray(configs) ? configs : [configs];
  }

  Object.freeze(configs);

  var defaultRender = md.renderer.rules.link_open || this.defaultRender;

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    var isLink2xwl = window.localStorage.getItem(IS_LINK_2_XWL);
    if (configs.attrs && isLink2xwl !== "false") {
      applyAttributes(idx, tokens, configs.attrs);
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };
}

markdownitLinkAttributes.defaultRender = function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};
