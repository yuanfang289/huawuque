import Vue     from 'vue';
import store   from './store'
import router  from 'src/router';
import Root    from './Root';
import 'component/_globals';
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true // add this line
import { Popup,Picker,DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
Vue.use(VueClipboard)



import {passport} from 'src/globalData';

// fastclick
import FastClick from 'fastclick'
FastClick.attach(document.body);

// 自定义指令
require('src/directive');

// 过滤器
require('src/filters');

// plugins
require('src/initPlugins');

let app = new Vue({
  passport,
  router,
  render: h => h(Root),
  store
}).$mount('#app');

// 开放API
window.XY = window.XY || {};
XY.passport = passport;
XY.DANativeApi = Vue.prototype.$DANativeApi;

import 'scss/public.scss';

export default app
