import {openAppParams} from 'config/feature';
import openApp from 'nativeFix/openApp';
import OpenApp from 'lib/dialog/main'

export default function install(Vue) {
  Vue.component('openApp', OpenApp);

  Vue.prototype.$openApp = function(url, cancelFn) {
    let openAppComponent = Vue.extend(OpenApp);
    let opts = {
      type: 'confirm',
      confirmText: '打开',
      cancelText: '放弃',
      content: openAppParams.confirmText,
      callback(res) {
        if (res.confirm) {
          openApp(url);
        } else {
          typeof cancelFn === 'function' && cancelFn();
        }
      }
    };

    let component = new openAppComponent({
      data: opts
    }).$mount();

    document.querySelector('body').appendChild(component.$el)
  };
}
