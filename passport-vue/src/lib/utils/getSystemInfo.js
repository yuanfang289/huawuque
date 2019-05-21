import getSystemInfo from "vendor/systemInfo/systemInfo";

export default function install(Vue) {
  // 获取客户端信息
  Vue.prototype.$systemInfo = getSystemInfo;
}
