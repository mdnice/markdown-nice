function makeRule(md) {
  return function replaceListItem(state) {
    // parser type as [{tokens},{indexWithHeading_open},...]
    md.renderer.rules.heading_open = function counter(...parser) {
      const index = findIndexAt(parser[1], parser[0]);
      return `<h1> ${index} `;
    };
  };
}

/**
 * 给定解析后的 heading_open index 值
 * 从某个数组中找出，该 index
 * @param index {number}
 * @param array {array}
 * @return {number} as 第几次出现该值
 */
function findIndexAt(index, array) {
  // Single token
  const targetToken = array[index];
  return array.reduce((acc, item, i) => {
    const allEqual = item.tag === targetToken.tag && item.type === targetToken.type && i < index;
    return allEqual ? acc + 1 : acc;
  }, 1);
}

export default (md) => {
  md.core.ruler.push("headerCounter", makeRule(md));
};
