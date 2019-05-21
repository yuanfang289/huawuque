import {scheme} from 'config/feature';

/**
 *
 * 读取scheme链接
 * @param {string} url    原生页名字(不包含scheme前缀)
 */
export default function setScheme(url = '') {
  return scheme.protocol + url
}
