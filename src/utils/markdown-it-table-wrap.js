function slugify(s, md) {
  // Unicode-friendly
  var spaceRegex = new RegExp(md.utils.lib.ucmicro.Z.source, "g");
  return encodeURIComponent(s.replace(spaceRegex, ""));
}

function makeRule(md, options) {
  return function addHeadingAnchors(state) {
    if (!options.tableWrap) {
      return;
    }
    var arr = [];
    for (var i = 0; i < state.tokens.length; i++) {
      var curToken = state.tokens[i];
      if (curToken.type === "table_open") {
        var tableWrapStart = new state.Token("html_inline", "", 0);
        tableWrapStart.content = `<figure class="table_wrap">`;
        arr.push(tableWrapStart);
        arr.push(curToken);
      } else if (curToken.type === "table_close") {
        var tableWrapClose = new state.Token("html_inline", "", 0);
        tableWrapClose.content = `</figure>`;
        arr.push(curToken);
        arr.push(tableWrapClose);
      } else {
        arr.push(curToken);
      }
    }
    state.tokens = arr;
  };
}

export default (md, opts) => {
  var defaults = {
    anchorClass: "markdown-it-table-wrap",
    tableWrap: true,
    slugify: slugify,
  };
  var options = md.utils.assign(defaults, opts);
  md.core.ruler.push("table_wrap", makeRule(md, options));
};
