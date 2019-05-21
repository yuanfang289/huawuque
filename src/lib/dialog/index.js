import Dialog from './main.vue'

export default function install(Vue) {
  Vue.component(Dialog.name, Dialog);

  Vue.prototype.$dialog = function(options = {}) {
    let dialog = Vue.extend(Dialog);
    let opts = Object.assign({
      type: 'alert'
    }, options);

    let component = new dialog({
      data: opts
    }).$mount();

    document.querySelector('body').appendChild(component.$el)
  };
}
