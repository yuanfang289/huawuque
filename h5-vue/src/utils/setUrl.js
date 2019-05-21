/**
 * 创建一个链接跳转
 *
 * @param url
 */
export default function setUrl(url) {
  let el  = document.createElement('a');
  el.href = url;
  el.click();
}
