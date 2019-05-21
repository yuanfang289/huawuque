import {routePrefix} from 'config/config';

const Index   = () => import('app/classroom/Index');
const CourseDetail   = () => import('app/classroom/CourseDetail');
const CourseOrder   = () => import('app/classroom/CourseOrder');
const MyCourse   = () => import('app/classroom/MyCourse');
const CourseList   = () => import('app/classroom/CourseList');
const ListenerList   = () => import('app/classroom/ListenerList');

export default [
  {
    path: `${routePrefix}/classroom/index`,
    name: 'classroomIndex',
    component: Index,
  },
  {
    path: `${routePrefix}/classroom/courseDetail/:id`,
    name: 'courseDetail',
    component: CourseDetail,
  },
  {
    path: `${routePrefix}/classroom/courseOrder/:id`,
    name: 'courseOrder',
    component: CourseOrder,
  },
  {
    path: `${routePrefix}/classroom/courseList`,
    name: 'courseList',
    component: CourseList,
  },
  {
    path: `${routePrefix}/classroom/listenerList`,
    name: 'listenerList',
    component: ListenerList,
  },
  {
    path: `${routePrefix}/classroom/myCourse`,
    name: 'myCourse',
    // meta: {
    //   requireAuth: true
    // },
    component: MyCourse,
  }
]
