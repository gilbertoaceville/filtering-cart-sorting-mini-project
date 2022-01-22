/**
 *
 * @param {*} element mainly the "a" tag
 * @param {*} hash refers to href value for hash routing
 */
export const dragItemTop = (element, hash) => {
  const dragToTop = document.createElement(element);
  dragToTop.setAttribute("href", hash);
  dragToTop.click();
};
