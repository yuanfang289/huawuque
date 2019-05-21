import {updateAppParams, openAppParams} from 'config/feature';
import getSystemInfo from 'vendor/systemInfo/systemInfo';
import {setUrl} from 'utils';
import UpdateApp from 'lib/dialog/main';

export default function install(Vue) {
  Vue.component('updateApp', UpdateApp);

  let systemInfo = getSystemInfo();

  /**
   * @param {string}   version   '1.1.1'
   * @param {object}   options   {confirm: Function, cancel: Function}
   */
  Vue.prototype.$updateApp = function(version, options = {}) {
    let updateApp = Vue.extend(UpdateApp);
    let {
      confirm,
      cancel
    } = options;

    let opts = {
      type: 'confirm',
      confirmText: '立即更新',
      content: `当前客户端版本过低，不支持此功能。请更新客户端至${version}或以上版本`,
      callback(res) {
        if (res.confirm) {
          typeof confirm === 'function' && confirm();

          if (systemInfo.isIos) {
            location.replace(updateAppParams.downloadLink.ios);
          } else
          if (systemInfo.isAndroid) {
            setUrl(updateAppParams.downloadLink.android);
          } else {
            setUrl(openAppParams.links.downAppUrl);
          }
        } else {
          typeof cancel === 'function' && cancel();
        }
      }
    };

    let component = new updateApp({
      data: opts
    }).$mount();

    document.querySelector('body').appendChild(component.$el)
  };
}
