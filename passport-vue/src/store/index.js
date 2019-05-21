import Vue  from 'vue';
import Vuex from 'vuex';

import * as getters   from './getters';
import * as actions   from './actions';
import mutations      from './mutations';

import comparisonTable from 'config/comparisonTable';

/**
 * @property {boolean} state.tokenChecking        是否正在验证Token
 * @property {boolean} state.tokenChecked         已执行过Token验证
 * @property {boolean} state.isLogin              是否已经登录
 * @property {boolean} state.serverError          服务器错误
 * @property {boolean} state.languageEnUS         是否显示为英文网站
 */

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  state: {
    tokenChecking: false,
    tokenChecked: false,
    isLogin: false,
    serverError: false,
    languageEnUS: false,
    comparisonTable
  },
  actions,
  getters,
  mutations,
  modules: {

  },
  strict: debug,
});


if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`

    // 加载新模块
    store.hotUpdate({
      getters: require('./getters').default,
      actions: require('./actions').default,
      mutations: require('./mutations').default,
      modules: {

      }
    })
  })
}

export default store
