import {routePrefix} from 'config/config';

const UserCenter = () => import('app/user/UserCenter');
const Task = () => import('app/user/Task');
const Rule = () => import('app/user/Rule');
const Detail = () => import('app/user/Detail');
const Invite = () => import('app/user/Invite');
const Honor = () => import('app/user/Honor');
const Clause = () => import('app/user/Clause');
const License = () => import('app/user/License');
const Hide = () => import('app/user/Hide');
const Protocol = () => import('app/user/Protocol');
const MembershipCard = () => import('app/user/MembershipCard');
const MyEcode = () => import('app/user/MyEcode');
const DiscountCode = () => import('app/user/DiscountCode');
const RightsConfirm = () => import('app/user/RightsConfirm');
const Q = () => import('app/user/Q');
const A = () => import('app/user/A');
const Coffee = () => import('app/user/Coffee');
const Eye = () => import('app/user/Eye');
const Ping = () => import('app/user/Ping');
const Sugar = () => import('app/user/Sugar');
const Rent = () => import('app/user/Rent');
const Rent2 = () => import('app/user/Rent2');
const Mforest = () => import('app/user/Mforest');
const Yaduo = () => import('app/user/Yaduo');
const IKang = () => import('app/user/IKang');
const Credit = () => import('app/credit/Index');  //新积分
const Img = () => import('app/user/Img');
const CardDetail = () => import('app/user/CardDetail')

export default [
  {
    path: `${routePrefix}/userCenter`,
    name: 'userCenter',
    // meta: {
    //   requireAuth: true
    // },
    component: UserCenter,
  },
  {
    path: `${routePrefix}/task`,
    name: 'task',
    // meta: {
    //   requireAuth: true
    // },
    component: Credit,
  },
  {
    path: `${routePrefix}/task/rule`,
    name: 'rule',
    // meta: {
    //   requireAuth: true
    // },
    component: Rule,
  },
  {
    path: `${routePrefix}/task/detail`,
    name: 'detail',
    // meta: {
    //   requireAuth: true
    // },
    component: Detail,
  },
  {
    path: `${routePrefix}/invite`,
    name: 'invite',
    // meta: {
    //   requireAuth: true
    // },
    component: Invite,
  },
  {
    path: `${routePrefix}/honor`,
    name: 'honor',
    // meta: {
    //   requireAuth: true
    // },
    component: Honor,
  },
  {
    path: `${routePrefix}/clause`,
    name: 'clause',
    // meta: {
    //   requireAuth: true
    // },
    component: Clause,
  },
  {
    path: `${routePrefix}/license`,
    name: 'license',
    // meta: {
    //   requireAuth: true
    // },
    component: License,
  },
  {
    path: `${routePrefix}/license/img`,
    name: 'img',
    // meta: {
    //   requireAuth: true
    // },
    component: Img,
  },
  {
    path: `${routePrefix}/hide`,
    name: 'hide',
    // meta: {
    //   requireAuth: true
    // },
    component: Hide,
  },
  {
    path: `${routePrefix}/protocol`,
    name: 'protocol',
    // meta: {
    //   requireAuth: true
    // },
    component: Protocol,
  },
  {
    path: `${routePrefix}/membership/card`,
    name: 'membershipCard',
    // meta: {
    //   requireAuth: true
    // },
    component: MembershipCard,
  },
  {
    path: `${routePrefix}/membership/myecode`,
    name: 'myEcode',
    // meta: {
    //   requireAuth: true
    // },
    component: MyEcode,
  },
  {
    path: `${routePrefix}/membership/discountcode`,
    name: 'discountCode',
    // meta: {
    //   requireAuth: true
    // },
    component: DiscountCode,
  },
  {
    path: `${routePrefix}/membership/confirm`,
    name: 'rightsConfirm',
    // meta: {
    //   requireAuth: true
    // },
    component: RightsConfirm,
  },
  {
    path: `${routePrefix}/membership/q`,
    name: 'Q',
    // meta: {
    //   requireAuth: true
    // },
    component: Q,
  },
  {
    path: `${routePrefix}/membership/a`,
    name: 'A',
    // meta: {
    //   requireAuth: true
    // },
    component: A,
  },
  {
    path: `${routePrefix}/membership/coffee`,
    name: 'coffee',
    // meta: {
    //   requireAuth: true
    // },
    component: Coffee,
  },
  {
    path: `${routePrefix}/membership/eye`,
    name: 'eye',
    // meta: {
    //   requireAuth: true
    // },
    component: Eye,
  },
  {
    path: `${routePrefix}/membership/ping`,
    name: 'ping',
    // meta: {
    //   requireAuth: true
    // },
    component: Ping,
  },
  {
    path: `${routePrefix}/membership/sugar`,
    name: 'sugar',
    // meta: {
    //   requireAuth: true
    // },
    component: Sugar,
  },
  {
    path: `${routePrefix}/membership/rent`,
    name: 'rent',
    // meta: {
    //   requireAuth: true
    // },
    component: Rent,
  },
  {
    path: `${routePrefix}/membership/mforest`,
    name: 'mforest',
    // meta: {
    //   requireAuth: true
    // },
    component: Mforest,
  },
  {
    path: `${routePrefix}/membership/yaduo`,
    name: 'yaduo',
    // meta: {
    //   requireAuth: true
    // },
    component: Yaduo,
  },
  {
    path: `${routePrefix}/membership/rent2`,
    name: 'rent2',
    // meta: {
    //   requireAuth: true
    // },
    component: Rent2,
  },
  {
    path: `${routePrefix}/membership/iKang`,
    name: 'iKang',
    // meta: {
    //   requireAuth: true
    // },
    component: IKang,
  },
  {
    path: `${routePrefix}/membership/carddetail`,
    name: 'cardDetail',
    // meta: {
    //   requireAuth: true
    // },
    component: CardDetail,
  }
]
