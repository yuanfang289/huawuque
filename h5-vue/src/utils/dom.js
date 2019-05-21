/**
 * 获取dom元素size和position信息
 * @param el    HTMLElement
 * @return {object}
 */
export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

/**
 * 设置指定元素的style
 * 
 * @param el    HTMLElement
 * @param {object} styleObject
 */
export function setStyle(el, styleObject = {}) {
  for (let prop in styleObject) {
    if (!styleObject.hasOwnProperty(prop)) continue;
    el.style[prop] = styleObject[prop];
  }
}

/**
 * 获取document宽、高、滚动条等信息
 */
export function getDocumentRect() {
  let {
    documentElement,
    body
  } = document;

  const clientWidth  = documentElement.clientWidth || body.clientWidth;
  const clientHeight = documentElement.clientHeight || body.clientHeight;
  const scrollTop    = documentElement.scrollTop || body.scrollTop;
  const scrollHeight = documentElement.scrollHeight || body.scrollHeight;

  return {
    clientWidth,
    clientHeight,
    scrollTop,
    scrollHeight
  }
}
