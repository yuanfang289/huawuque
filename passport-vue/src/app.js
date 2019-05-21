import Vue     from 'vue';
import store   from './store'
import router  from 'src/router';
import Root    from './Root';
import 'component/_globals';

// fastclick
import FastClick from 'fastclick'
FastClick.attach(document.body);

// 自定义指令
require('src/directive');

// plugins
require('src/initPlugins');

const app = new Vue({
  router,
  render: h => h(Root),
  store
}).$mount('#app');

import 'scss/public.scss';
