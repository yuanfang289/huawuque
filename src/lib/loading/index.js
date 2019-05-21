import PageLoading from './PageLoading';

export default function install(Vue) {
  Vue.component(PageLoading.name, PageLoading);

  // 实例缓存
  let loadingCache = [];

  Vue.prototype.$showLoading = function(content = '正在加载...') {
    let Loading = Vue.extend(PageLoading);

    let component = new Loading({
      data: {
        popupLoading: true,
        content
      }
    }).$mount();

    // 添加实例到缓存
    loadingCache.push(component);

    document.querySelector('body').appendChild(component.$el);

    return {
      hide
    };

    function hide() {
      component.hide();
      removeLoadingCache(component._uid);
    }

    function removeLoadingCache(uid) {
      for (let i = 0; i < loadingCache.length; i++) {
        let item = loadingCache[i];
        if (item._uid === uid) {
          loadingCache.splice(i, 1);
          break;
        }
      }
    }
  };

  Vue.prototype.$hideLoading = function() {
    loadingCache.forEach(item => {
      item.hide();
    });
    loadingCache = [];
  }
}
