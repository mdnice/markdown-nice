function makeRule(md) {
  return function replaceListItem() {
    md.renderer.rules.list_item_open = function replaceOpen() {
      return "<li><p>";
    };
    md.renderer.rules.list_item_close = function replaceClose() {
      return "</p></li>";
    };
  };
}

export default (md) => {
  md.core.ruler.push("replace-li", makeRule(md));
};
