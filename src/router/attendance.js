/**
 * Created by xiezy on 2019/02/19.
 */
import {routePrefix} from 'config/config';

const attendance = () => import('app/attendance/Index');
const detail = () => import('app/attendance/Detail');
const statistics = () => import('app/attendance/Statistics');
const late = () => import('app/attendance/Late');
const pstatistics = () => import('app/attendance/Pstatistics');
const setup = () => import('app/attendance/SetUp');
const Month = () => import('app/attendance/Month');
export default [
  {
    path: `${routePrefix}/attendance`,
    name: 'attendance',
    component: attendance,
  },
  {
    path: `${routePrefix}/attendance/detail`,
    name: 'adetail',
    component: detail,
  },
  {
    path: `${routePrefix}/attendance/statistics`,
    name: 'statistics',
    component: statistics,
  },
  {
    path: `${routePrefix}/attendance/late`,
    name: 'late',
    component: late,
  },
  {
    path: `${routePrefix}/attendance/pstatistics`,
    name: 'pstatistics',
    component: pstatistics,
  },
  {
    path: `${routePrefix}/attendance/setup`,
    name: 'setup',
    component: setup,
  },
  {
    path: `${routePrefix}/attendance/month`,
    name: 'Month',
    component: Month,
  },
]

