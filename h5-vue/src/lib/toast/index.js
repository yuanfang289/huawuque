import Toast from './main.vue'

export default function install(Vue) {
  Vue.component(Toast.name, Toast);

  let cache = [];

  Vue.prototype.$toast = function(options = {content: ''}) {
    Vue.prototype.$hideToast();

    let toast = Vue.extend(Toast);
    let opts = {};

    if (typeof options === 'string') {
      opts.content = options;
    } else {
      opts = Object.assign(opts, options);
    }

    let component = new toast({
      data: opts
    }).$mount();


    // 添加实例到缓存
    cache.push(component);

    document.querySelector('body').appendChild(component.$el);

    return {
      hide
    };

    function hide() {
      component.destroy();
      removeCache(component._uid);
    }

    function removeCache(uid) {
      for (let i = 0; i < cache.length; i++) {
        let item = cache[i];
        if (item._uid === uid) {
          cache.splice(i, 1);
          break;
        }
      }
    }
  };

  Vue.prototype.$hideToast = function() {
    cache.forEach(item => {
      item.destroy();
    });
    cache = [];
  }
}
