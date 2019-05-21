import {routePrefix} from 'config/config';

import Home from 'app/Home';
const Index      = () => import('app/index/Index');
const Index1      = () => import('app/index1/Index');
const Index2     = () => import('app/index1/Index2');
const Workstage  = () => import('app/workstage/Workstage');
const ApplyList   = () => import('app/index1/ApplyList');
const News       = () => import('app/news/News');

export default [
  {
    path: `${routePrefix}`,
    redirect: {name: 'index'}
  },
  {
    path: `${routePrefix}/index1`,
    name: 'index1',
    component: Index1,
    meta: {
      title: '首页',
      requireAuth: true
    }
  },
  {
    path: `${routePrefix}/index2`,
    name: 'index2',
    component: Index2,
    meta: {
      title: '首页-nologin'
    }
  },
  {
    path: `/v3/applyList`,
    name: 'applyList',
    component: ApplyList,
  },
  {
    path: `${routePrefix}/`,
    component: Home,
    children: [
      {
        path: 'index',
        name: 'index',
        component: Index,
        meta: {
          title: '首页'
        }
      },
      {
        path: 'workstage',
        name: 'workstage',
        component: Workstage,
        meta: {
          title: '社区'
        }
      },
      // {
      //   path: 'activity',
      //   name: 'activity',
      //   component: Activity,
      //   meta: {
      //     title: '活动'
      //   }
      // },
      {
        path: 'news',
        name: 'news',
        component: News,
        meta: {
          title: '资讯'
        }
      },

    ]
  }
]
