const defaultOption = {
  limitless: false, // 限制图片数量
  limit: 10, // 图片数量上限
};

const imageFlowPlugin = (md, opt) => {
  const options = opt || defaultOption;

  const tokenize = (state, start) => {
    let token;

    const matchReg = /^<((!\[([^\]])*\]\(([^)])*\)(,?)(\s)*)*)>/;
    const srcLine = state.src.slice(state.bMarks[start], state.eMarks[start]);

    if (srcLine.charCodeAt(0) !== 0x3c /* < */) {
      return false;
    }
    const match = matchReg.exec(srcLine);

    if (match) {
      if (!options.limitless && match[1].split(/,|\s/).filter((val) => val).length < options.limit) {
        token = state.push("imageFlow", "", 0);
        [, token.content] = match;
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
    const contents = tokens[idx].content.split(/,|\s/).filter((val) => val);
    let wrapperContent = "";
    let image;
    contents.forEach((content) => {
      image = content.split(/\[|\]|\(|\)|!/).filter((val) => val);
      wrapperContent += `<section class="imageflow-layer3"><img alt=${image[0]} src=${
        image[1]
      } class="imageflow-img" /></section>`;
    });

    return start + wrapperContent + end;
  };

  md.block.ruler.before("paragraph", "imageFlow", tokenize);
};

export default imageFlowPlugin;
