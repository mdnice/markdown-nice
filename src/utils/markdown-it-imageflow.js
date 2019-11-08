const defaultOption = {
  limitless: false, // 限制图片数量
  limit: 10, // 图片数量上限,
  height: 300, // 组件高度
};

const imageFlowPlugin = (md, opt) => {
  const options = opt || defaultOption;
  const style = {
    IF_layer1: `margin:1em;white-space:normal;border:none;padding:0px;overflow:hidden;height:${options.height}px;line-height:${options.height}px`,
    IF_layer2: `white-space:nowrap;width:100%;overflow-x:scroll;`,
    IF_layer3: `display:inline-block;word-wrap:break-word;white-space:normal;vertical-align:middle;width:100%;`,
    IF_image: `display:inline-block;`,
  };

  const tokenize = (state, silent) => {
    let result = false;
    let token;
    const matchReg = /^<((!\[([^\]])*\]\(([^)])*\)(,?)(\s)*)*)>/;

    if (silent) {
      return result;
    }
    if (state.src.charCodeAt(state.pos) !== 0x3c /* < */) {
      return result;
    }

    const match = matchReg.exec(state.src.substr(state.pos));

    if (match) {
      if (options.limitless) {
        result = true;
      } else if (match[1].split(/,|\s/).filter((val) => val).length < options.limit) {
        result = true;
      } else {
        return result;
      }

      token = state.push("imageFlow_start", "imageFlow", 1);
      token = state.push("imageFlow_content", "imageFlow", 0);
      [, token.content] = match;
      token = state.push("imageFlow_end", "imageFlow", -1);

      // update position
      var newline = state.src.indexOf("\n", state.pos);
      if (newline !== -1) {
        state.pos = newline;
      } else {
        state.pos = state.pos + state.posMax + 1;
      }
    }

    return result;
  };

  md.renderer.rules.imageFlow_start = () => {
    return `<section style=${style.IF_layer1}><section style=${style.IF_layer2}>`;
  };
  md.renderer.rules.imageFlow_end = () => {
    return `</section></section>`;
  };
  md.renderer.rules.imageFlow_content = (tokens, idx) => {
    const contents = tokens[idx].content.split(/,|\s/).filter((val) => val);
    let wrapperContent = "";
    let image;
    contents.forEach((content) => {
      image = content.split(/\[|\]|\(|\)|!/).filter((val) => val);
      wrapperContent += `<section style=${style.IF_layer3}><img alt=${image[0]} src=${image[1]} style=${
        style.IF_image
      } /></section>`;
    });

    return wrapperContent;
  };

  md.inline.ruler.before("image", "imageFlow", tokenize);
};

export default imageFlowPlugin;
