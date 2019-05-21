import Vue from 'vue';
import VueRouter from 'vue-router';
import globalData from "src/globalData";
import store  from './store';
import {redirect} from 'utils';

Vue.use(VueRouter);

import Signin  from 'app/Signin';
import Verification  from 'app/Verification';
import Forget  from 'app/Forget';
import SetPassword  from 'app/SetPassword';
import Agreement  from 'app/Agreement';
import InviteRegister  from 'app/InviteRegister';


const routes = [
  {
    path: '/',
    redirect: '/passport/login'
  },
  {
    path: '/passport/login',
    name: 'login',
    component: Signin,
    meta: {
      notLogin: true
    }
  },
  {
    path: '/passport/logout',
    name: 'logout',
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/passport/verification',
    name: 'verification',
    component: Verification
  },
  {
    path: '/passport/inviteRegister/:userId',
    name: 'inviteRegister',
    component: InviteRegister
  },
  {
    path: '/passport/forget',
    name: 'forget',
    component: Forget
  },
  {
    path: '/passport/setPassword',
    name: 'setPassword',
    component: SetPassword
  },
  {
    path: '/passport/agreement',
    name: 'agreement',
    component: Agreement
  },
  {
    path: '*',
    redirect: '/passport/login'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  // 后退按钮hack
  clearTimeout(globalData.routerTimer);

  tokenCheck(() => {

    // 只有未登录状态才可以访问登录页
    if (to.meta.notLogin) {

      // 已登录，跳转到来源页，或者到首页(www|m)
      if (store.state.isLogin) {
        next(false);
        redirect();
      } else {
        next();
      }
    // 必须登录后才能访问
    } else if(to.meta.requireAuth) {
      const retUrl = to.query.retUrl;
      if (store.state.isLogin) {
        logout(() => {
          next({
            replace: true,
            name: 'login',
            query: {
              retUrl
            }
          });
        });
      } else {
        next({
          replace: true,
          name: 'login',
          query: {
            retUrl
          }
        });
      }
    } else {
      next();
    }
  });
});

function logout(cb) {
  store.dispatch('logout').then(() => {
    if (!store.state.isLogin) {
      cb();
    }
  });
}

function tokenCheck(cb) {
  if (store.state.tokenChecked) {
    cb();
    return
  }

  store.dispatch('isLoginUser').then(cb)
}

export default router
