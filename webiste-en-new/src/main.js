import Vue from 'vue'
import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
import {Message,Modal} from 'iview'
import VueAMap from 'vue-amap'
import promise from 'es6-promise'
promise.polyfill()
Vue.prototype.$Message = Message
Vue.component('Modal',Modal)
Vue.config.productionTip = false
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  //key: '1a6c11df31e5c9d7e4a3a94042076029',
  key: '7859a846371fabf0047ac7d9e18776ba',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','MarkerClusterer'],
  v: '1.4.4'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('custom-render-event'))
  }

})

//import '@/assets/less/iview.less';

