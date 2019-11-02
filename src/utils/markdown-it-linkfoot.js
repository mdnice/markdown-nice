function renderFootnoteAnchorName(tokens, idx, options, env) {
  const n = Number(tokens[idx].meta.id + 1).toString();
  let prefix = "";

  if (typeof env.docId === "string") {
    prefix = "-" + env.docId + "-";
  }

  return prefix + n;
}

function renderFootnoteCaption(tokens, idx) {
  let n = Number(tokens[idx].meta.id + 1).toString();

  if (tokens[idx].meta.subId > 0) {
    n += ":" + tokens[idx].meta.subId;
  }

  return "[" + n + "]";
}

// eslint-disable-next-line
function renderFootnoteWord(tokens, idx, options, env, slf) {
  return '<span class="footnote-word">' + tokens[idx].content + "</span>";
}

function renderFootnoteRef(tokens, idx, options, env, slf) {
  // var id      = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
  const caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
  return '<sup class="footnote-ref">' + caption + "</sup>";
}

// eslint-disable-next-line
function renderFootnoteBlockOpen(tokens, idx, options) {
  return '<h3 class="footnotes-sep"></h3>\n<section class="footnotes">\n';
}

function renderFootnoteBlockClose() {
  return "</section>\n";
}

function renderFootnoteOpen(tokens, idx, options, env, slf) {
  let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);

  if (tokens[idx].meta.subId > 0) {
    id += ":" + tokens[idx].meta.subId;
  }

  return '<span id="fn' + id + '" class="footnote-item"><span class="footnote-num">[' + id + "] </span>";
}

function renderFootnoteClose() {
  return "</span>\n";
}

// Process [link](<to> "stuff")
function isSpace(code) {
  switch (code) {
    case 0x09:
    case 0x20:
      return true;
    default:
  }
  return false;
}

function normalizeReference(str) {
  // use .toUpperCase() instead of .toLowerCase()
  // here to avoid a conflict with Object.prototype
  // members (most notably, `__proto__`)
  return str
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
}

function linkFoot(state, silent) {
  let attrs,
    code,
    label,
    pos,
    res,
    ref,
    title,
    token,
    href = "",
    start = state.pos,
    footnoteContent,
    parseReference = true;
  const oldPos = state.pos;
  const max = state.posMax;

  if (state.src.charCodeAt(state.pos) !== 0x5b /* [ */) {
    return false;
  }

  const labelStart = state.pos + 1;
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) {
    return false;
  }

  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28 /* ( */) {
    //
    // Inline link
    //

    // might have found a valid shortcut link, disable reference parsing
    parseReference = false;

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0a) {
        break;
      }
    }
    if (pos >= max) {
      return false;
    }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      footnoteContent = res.str;
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = "";
      }
    }

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    start = pos;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0a) {
        break;
      }
    }

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0a) {
          break;
        }
      }
    } else {
      title = "";
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29 /* ) */) {
      // parsing a valid shortcut link failed, fallback to reference
      parseReference = true;
    }
    pos++;
  }

  if (parseReference) {
    //
    // Link reference
    //
    if (typeof state.env.references === "undefined") {
      return false;
    }

    if (pos < max && state.src.charCodeAt(pos) === 0x5b /* [ */) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) {
      label = state.src.slice(labelStart, labelEnd);
    }

    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    // 如果存在标题则转成脚注
    if (title) {
      state.pos = labelStart;
      state.posMax = labelEnd;

      let tokens;

      if (!state.env.footnotes) {
        state.env.footnotes = {};
      }
      if (!state.env.footnotes.list) {
        state.env.footnotes.list = [];
      }

      const footnoteId = state.env.footnotes.list.length;

      // *用来让链接倾斜
      state.md.inline.parse(`${title}: *${footnoteContent}*`, state.md, state.env, (tokens = []));

      token = state.push("footnote_word", "", 0);
      token.content = state.src.slice(labelStart, labelEnd);

      token = state.push("footnote_ref", "", 0);
      token.meta = {id: footnoteId};

      state.env.footnotes.list[footnoteId] = {tokens: tokens};
    }
    // 不存在标题则判断域名
    else {
      state.pos = labelStart;
      state.posMax = labelEnd;

      token = state.push("link_open", "a", 1);
      attrs = [["href", href]];
      token.attrs = attrs;
      if (title) {
        attrs.push(["title", title]);
      }

      state.md.inline.tokenize(state);

      token = state.push("link_close", "a", -1);
    }
  }

  state.pos = pos;
  state.posMax = max;

  return true;
}

// Glue footnote tokens to end of token stream
function footnoteTail(state) {
  var i,
    l,
    lastParagraph,
    list,
    token,
    tokens,
    current,
    currentLabel,
    insideRef = false,
    refTokens = {};

  if (!state.env.footnotes) {
    return;
  }

  state.tokens = state.tokens.filter((tok) => {
    if (tok.type === "footnote_reference_open") {
      insideRef = true;
      current = [];
      currentLabel = tok.meta.label;
      return false;
    }
    if (tok.type === "footnote_reference_close") {
      insideRef = false;
      // prepend ':' to avoid conflict with Object.prototype members
      refTokens[":" + currentLabel] = current;
      return false;
    }
    if (insideRef) {
      current.push(tok);
    }
    return !insideRef;
  });

  if (!state.env.footnotes.list) {
    return;
  }
  list = state.env.footnotes.list;

  token = new state.Token("footnote_block_open", "", 1);
  state.tokens.push(token);

  for (i = 0, l = list.length; i < l; i++) {
    token = new state.Token("footnote_open", "", 1);
    token.meta = {id: i, label: list[i].label};
    state.tokens.push(token);

    if (list[i].tokens) {
      tokens = [];

      token = new state.Token("paragraph_open", "p", 1);
      token.block = true;
      tokens.push(token);

      token = new state.Token("inline", "", 0);
      token.children = list[i].tokens;
      token.content = "";
      tokens.push(token);

      token = new state.Token("paragraph_close", "p", -1);
      token.block = true;
      tokens.push(token);
    } else if (list[i].label) {
      tokens = refTokens[":" + list[i].label];
    }

    state.tokens = state.tokens.concat(tokens);
    if (state.tokens[state.tokens.length - 1].type === "paragraph_close") {
      lastParagraph = state.tokens.pop();
    } else {
      lastParagraph = null;
    }

    if (lastParagraph) {
      state.tokens.push(lastParagraph);
    }

    token = new state.Token("footnote_close", "", -1);
    state.tokens.push(token);
  }

  token = new state.Token("footnote_block_close", "", -1);
  state.tokens.push(token);
}

export default (md) => {
  md.renderer.rules.footnote_ref = renderFootnoteRef;
  md.renderer.rules.footnote_word = renderFootnoteWord;
  md.renderer.rules.footnote_block_open = renderFootnoteBlockOpen;
  md.renderer.rules.footnote_block_close = renderFootnoteBlockClose;
  md.renderer.rules.footnote_open = renderFootnoteOpen;
  md.renderer.rules.footnote_close = renderFootnoteClose;

  // helpers (only used in other rules, no tokens are attached to those)
  md.renderer.rules.footnote_caption = renderFootnoteCaption;
  md.renderer.rules.footnote_anchor_name = renderFootnoteAnchorName;

  md.inline.ruler.at("link", linkFoot);
  md.core.ruler.after("inline", "footnote_tail", footnoteTail);
};
