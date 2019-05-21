import * as types from "./mutationTypes";

export default {
  // 发出TOKEN验证请求
  [types.CHECK_TOKEN_REQUEST](state) {
    state.tokenChecking = true;
  },
  // TOKEN验证请求结束
  [types.CHECK_TOKEN_SUCCESS](state, {retCode, data}) {
    state.tokenChecking = false;
    state.tokenChecked  = true;
    state.isLogin       = retCode === 0;
    state.userInfo      = data || {};
  },
  // 服务器错误
  [types.SERVER_ERROR](state) {
    state.serverError = true;
    state.refreshServerError = false;
  },
  // 服务器错误 --> 恢复
  [types.SERVER_ERROR_RESUMED](state) {
    state.serverError = false;
    state.refreshServerError = false;
  },
  //设置网站语言是否为英文
  [types.LANGUAGE_EN_US](state, isEnUs) {
    state.languageEnUS = isEnUs;
    document.querySelector('html').setAttribute('lang', isEnUs ? 'en' : 'zh-CN');
  }
}
