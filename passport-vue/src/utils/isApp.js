import {regx} from 'config/feature';

/**
 * 判断当前环境是不是APP
 *
 * @return {boolean}
 */
export default function() {
  return regx.isApp.test(window.navigator.userAgent)
}
