import MaskLayer from './MaskLayer';

export default function install(Vue) {
  Vue.component(MaskLayer.name, MaskLayer);

  // 实例缓存
  let maskCache = [];

  Vue.prototype.$showMask = function(options = {zIndex: 1000}) {
    let Mask = Vue.extend(MaskLayer);
    let onHide = options.onHide;
    delete options.onHide;

    let opts = {
      showMask: true,
      onHide: function(uid) {
        typeof onHide === 'function' && onHide();
        removeCache(uid);
      }
    };

    if (typeof options === 'string') {
      opts.zIndexNum = options;
    } else {
      options.zIndexNum = options.zIndex;
      delete options.zIndex;

      opts = Object.assign(opts, options);
    }

    let component = new Mask({
      data: opts
    }).$mount();

    // 添加实例到缓存
    maskCache.push(component);

    document.querySelector('body').appendChild(component.$el);

    return {
      hide
    };

    function hide() {
      component.hide();
      removeCache(component._uid);
    }

    function removeCache(uid) {
      for (let i = 0; i < maskCache.length; i++) {
        let item = maskCache[i];
        if (item._uid === uid) {
          maskCache.splice(i, 1);
          break;
        }
      }
    }
  };

  Vue.prototype.$hideMask = function() {
    maskCache.forEach(item => {
      item.hide();
    });
    maskCache = [];
  }
}
