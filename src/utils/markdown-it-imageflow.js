const defaultOption = {
  limitless: false, // 限制图片数量
  limit: 10, // 图片数量上限
};

const imageFlowPlugin = (md, opt) => {
  const options = opt || defaultOption;

  const tokenize = (state, start) => {
    let token;

    const matchReg = /^<((!\[[^[\]]*\]\([^()]+\)(,?\s*(?=>)|,\s*(?!>)))+)>/;
    const srcLine = state.src.slice(state.bMarks[start], state.eMarks[start]);

    if (srcLine.charCodeAt(0) !== 0x3c /* < */) {
      return false;
    }
    const match = matchReg.exec(srcLine);

    if (match) {
      const images = match[1].match(/\[[^\]]*\]\([^)]+\)/g);
      if (!options.limitless && images.length <= options.limit) {
        token = state.push("imageFlow", "", 0);
        token.meta = images;
        token.block = true;

        // update line
        state.line++;
        return true;
      }
    }
    return false;
  };

  md.renderer.rules.imageFlow = (tokens, idx) => {
    const start = `<section class="imageflow-layer1"><section class="imageflow-layer2">`;
    const end = `</section></section>`;
    const contents = tokens[idx].meta;
    let wrappedContent = "";
    let alt;
    let src;
    contents.forEach((content) => {
      [, alt] = content.match(/\[([^[\]]*)\]/);
      [, src] = content.match(/[^[]*\(([^()]*)\)[^\]]*/);
      wrappedContent += `<section class="imageflow-layer3"><img alt="${alt}" src="${src}" class="imageflow-img" /></section>`;
    });

    return start + wrappedContent + end;
  };

  md.block.ruler.before("paragraph", "imageFlow", tokenize);
};

export default imageFlowPlugin;
