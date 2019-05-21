UR.setDomainCookie = function (key, value) {
  $.cookie(key, value, {path: '/', domain:'urwork.cn'})
};
