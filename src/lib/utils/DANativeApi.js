import DANativeApiInit from "vendor/DANativeApi/DANativeApi";

export default function install(Vue) {
  Vue.prototype.$DANativeApi = DANativeApiInit();
}
