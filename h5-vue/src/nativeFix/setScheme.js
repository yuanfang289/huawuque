import Vue  from 'vue';
import getScheme from './getScheme';

/**
 *
 * 跳转原生页
 * @param {string} url    原生页名字(不包含scheme前缀)
 */
export default function setScheme(url = '') {
  Vue.prototype.$DANativeApi.navigateTo({
    url: getScheme(url)
  })
}
