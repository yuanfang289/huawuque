import Vue from 'vue';
import VueRouter from 'vue-router';

import {routePrefix} from 'config/config';
import globalData, {passport} from "src/globalData";
import {getLocation} from 'utils';
import {isApp, toLogin} from 'nativeFix';

import store from './store';

import NotFound from 'app/NotFound';

const Swiper = () => import('component/swiper/SwiperDemo');

import home       from 'router/home';
import market     from 'router/market';
import userCenter from 'router/userCenter';
import classroom  from 'router/classroom';
import uGoods  from 'router/uGoods';
import video  from 'router/video';
import activity  from 'router/activity';
import workStage  from 'router/workStage';
import credit  from 'router/credit';
import uGift  from 'router/uGift';
import maker  from 'router/maker';
import attendance from 'router/attendance';
import mPackage from 'router/mPackage';
import member from 'router/member';

Vue.use(VueRouter);

const routes = [
 ...home,
   ...market,
  ...userCenter,
  ...classroom,
  ...uGoods,
  ...video,
   ...activity,
  ...workStage,
  ...credit,
  ...uGift,
  ...maker,
  ...attendance,
  ...mPackage,
  ...member,
 /*{
    path: `${routePrefix}/demo`,
    name: 'demo',
    component: Swiper,
  },*/
/*  {
   path: `${routePrefix}/user`,
   redirect: {name: 'userCenter'}
 },*/
  {
    path: '*',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  // 后退按钮hack
  clearTimeout(globalData.routerTimer);

  const isOpenWebView = to.params.openWebView;
  // if (isApp()){
  //   if(to.path=="/v2/index"){
  //     next({ path: '/v2/index1', query:to.query})
  //     return
  //   }
  // }
    if (isApp() && isOpenWebView) {
    openWebView(to);
    next(false);
    return;
  }

  tokenCheck(() => {
    if (to.meta.requireAuth) {
        if (store.state.isLogin) {
          if(to.path=="/v2/index1"&&store.state.userInfo.enterType!=3){
            next({ path: '/v2/index2', query:to.query})
            return
          }
          next();
        } else {
          if(to.path=="/v2/index1"){
            next({ path: '/v2/index2', query:to.query})
            return
          }
          next(false);

          // TODO 原生APP补丁
          if (isApp()) {
            toLogin();
          } else {
            passport.toLogin(to.fullPath);
          }
        }
    } else {
      next();
    }
  });
});

function openWebView(route) {
  const location = getLocation();
  Vue.prototype.$DANativeApi.navigateTo({
    url: location.origin + route.path
  })
}

function tokenCheck(cb) {
  // cb();return
  if (store.state.tokenChecked) {
    cb();
    return
  }

  store.dispatch('isLoginUser')
    .then(cb)
    .catch(() => {
      store.dispatch('serverError')
    })
}

export default router
