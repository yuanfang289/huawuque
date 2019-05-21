import setScheme from './setScheme';

/**
 *
 * 跳转原生登录页
 * @param {string} redirect     登录后跳转的页面链接
 */
export default function toLogin(redirect = '') {
  setScheme(`login${redirect ? '?redirect=' + encodeURIComponent(redirect) : ''}`);
}
