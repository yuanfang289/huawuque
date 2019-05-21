import Vue from 'vue';

// 设置title
Vue.directive('title', {
  inserted: el => {
    document.title = el.innerText;
    el.remove();
  }
});
