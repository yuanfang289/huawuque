import Vue from 'vue'

import Router from 'vue-router'
import Admin from '@/app/Admin'
import commu from '@/app/Commu';
import appDown from '@/app/AppDown';
import commuDetail from '@/app/commuDetail';
import scroll from '@/app/scroll';
import consult from '@/app/consult';
import about from '@/app/page/about';
import cont from '@/app/page/cont';
import legal from '@/app/page/legal';
import policy from '@/app/page/policy';
import join from '@/app/page/join';
Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: 'en',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Admin
    },
    {
      path: '/scroll',
      name: 'scroll',
      component: scroll,
    },
    {
      path: '/commu/detail',
      name: 'commudetail',
      component: commuDetail,
    },
    {
      path: '/commu/detail/',
      name: 'commudetailBack',
      component: commuDetail,
    },
    {
      path: '/commu',
      name: 'commu',
      component: commu,
    },
    {
      path: '/appdown',
      name: 'appdown',
      component: appDown,
    },
    {
      path: '/consult',
      name: 'consult',
      component: consult,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/about',
      name: 'about',
      component: about,
    },
    {
      path: '/cont',
      name: 'cont',
      component: cont,
    },
    {
      path: '/legal',
      name: 'legal',
      component: legal,
    },
    {
      path: '/policy',
      name: 'policy',
      component: policy,
    },
    {
      path: '/join',
      name: 'join',
      component: join,
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
})

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})
export default router


