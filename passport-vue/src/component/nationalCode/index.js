import NationalCode from 'src/component/nationalCode/NationalCode';

export default function install(Vue) {
  Vue.component(NationalCode.name, NationalCode);

  // 实例缓存
  let NationalCache = [];

  Vue.prototype.$showNationalCode = function (option = {}) {
    let NationCode = Vue.extend(NationalCode);

    let opt = Object.assign({}, option);

    let component = new NationCode({
      data: opt
    }).$mount();

    // 添加实例到缓存
    NationalCache.push(component);

    document.querySelector('body').appendChild(component.$el);
  };

  Vue.prototype.$hideNationalCode = function () {
    maskCache.forEach(item => {
      item.hide();
    });
    maskCache = [];
  }
}
