import {setStyle} from "utils/dom";

export default function install(Vue) {

  // 添加 class name
  Vue.prototype.$addClassName = function(selector, className) {
    if(/^[HTML]\w+[Element]\]$/.test(Object.prototype.toString.call(selector).split(' ')[1])){
      selector.classList.add(className)
    }else {
      if(document.querySelector(selector)){
        document.querySelector(selector).classList.add(className)
      }
    }
  };
  // 删除 class name
  Vue.prototype.$removeClassName = function(selector, className) {
    if(/^[HTML]\w+[Element]\]$/.test(Object.prototype.toString.call(selector).split(' ')[1])){
      selector.classList.remove(className)
    }else {
      if(document.querySelector(selector)){
           document.querySelector(selector).classList.remove(className)
      }
    }
  };
  // 切换 class name
  Vue.prototype.$toggleClassName = function(selector, className) {
    if(/^[HTML]\w+[Element]\]$/.test(Object.prototype.toString.call(selector).split(' ')[1])){
      selector.classList.add(className)
    }else {
      if(document.querySelector(selector)){
      document.querySelector(selector).classList.toggle(className)
      }
    }
  };

  // 设置指定 dom 的 style
  Vue.prototype.$setStyle = setStyle;

  // 设置 body 的 style
  Vue.prototype.$setBodyStyle = function(key, value) {
    setStyle(document.body, {
      [key]: value
    })
  };

  // 设置 html 的 style
  Vue.prototype.$setHtmlStyle = function(key, value) {
    setStyle(document.querySelector('html'), {
      [key]: value
    })
  };

  // 设置 body 的 background-color
  Vue.prototype.$setBGColor = function(color) {
    switch (color) {
      case 'gray':
        color = '#f5f5f5';
        break;
    }
    document.body.style.backgroundColor = color;
  };
}
