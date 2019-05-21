import Vue from 'vue';
import getSystemInfo from 'vendor/systemInfo/systemInfo';

/**
 * 通过传入的APP版本号与当前APP版本号对比，执行相应的回调函数
 *
 * @param {string}           ios                 ios客户端版本号，如：'1.1.1'
 * @param {string, object}   android             android客户端版本号，如：'1.1.1'
 * @param {object}           options             {success: Function, fail: Function, cancel: Function}
 * @property {function}      options.success     版本符合回调函数
 * @property {function}      options.fail        版本不符合回调函数
 * @property {function}      options.cancel      取消版本升级的回调函数
 */
export default function appVersionHold(ios, android, options = {}) {

  let systemInfo = getSystemInfo();

  // 如果参数长度为2，则认为ios和android的版本号一致，options取android作为参数
  if (arguments.length === 2) {
    options = android;
    android = ios;
  }

  let version = Vue.prototype.$DANativeApi.apiVersionNumber || 0;

  // APP版本符合，执行成功回调函数
  if (version >= (systemInfo.isIos ? parse(ios) : parse(android))) {
    typeof options.success === 'function' && options.success();
  } else {

    let failRes = true;

    // APP版本不符合，执行失败回调函数
    if (typeof options.fail === 'function' && options.fail() === false) {
      failRes = false;
    }

    // 如果fail回调函数返回 false，则不显示更新客户端对话框(undefined不等于false)
    if (failRes !== false) {
      Vue.prototype.$updateApp(systemInfo.isIos ? ios : android, {
        cancel: options.cancel
      });
    }
  }

  // 注入context，这里的this是HTMLElement
  if (this.nodeType && this.nodeType === 1) {

    // 防止重复点击
    this.lock = false;
  }

  function parse(string = '') {
    return +string.split('.').join('')
  }
}
