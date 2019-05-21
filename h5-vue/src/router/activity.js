/**
 * Created by xiezy on 2018/10/25.
 */
import {routePrefix} from 'config/config';
const Index   = () => import('app/activity/activity');
const ChinaVoice   = () => import('app/activity/ChinaVoice');
const SingerDetail   = () => import('app/activity/SingerDetail');
const RankingList   = () => import('app/activity/RankingList');
const VoteRule   = () => import('app/activity/VoteRule');
const Kill   = () => import('app/activity/Kill');
const GoodsDetail   = () => import('app/activity/GoodsDetail');
const KillRule   = () => import('app/activity/KillRule');
const Library   = () => import('app/activity/Library');
const MessageWish   = () => import('app/activity/MessageWish');
const RightsPage   = () => import('app/activity/RightsPage');
const RightsPage2 = () => import('app/activity/RightsPage2');
const RightsPage3 = () => import('app/activity/RightsPage3');
const LawDay   = () => import('app/activity/law');
export default [
  {
    path: `/v3/activity/index`,
    name: 'activityIndex',
    component: Index,
  },
  {
    path: `${routePrefix}/activity/chinaVoice`,
    name: 'chinaVoice',
    component: ChinaVoice,
  },
  {
    path: `${routePrefix}/activity/singerDetail/:playId/:name`,
    name: 'singerDetail',
    component: SingerDetail,
  },
  {
    path: `${routePrefix}/activity/rankingList`,
    name: 'rankingList',
    component: RankingList,
  },
  {
    path: `${routePrefix}/activity/voteRule`,
    name: 'voteRule',
    component: VoteRule,
  },
  {
    path: `${routePrefix}/activity/kill`,
    name: 'Kill',
    component: Kill,
  },
  {
    path: `${routePrefix}/activity/goodsDetail`,
    name: 'goodsDetail',
    component: GoodsDetail,
  },
  {
    path: `${routePrefix}/activity/killrule`,
    name: 'killRule',
    component: KillRule,
  },
  {
    path: `${routePrefix}/activity/library`,
    name: 'library',
    component: Library,
  },
  {
    path: `${routePrefix}/activity/messageWish`,
    name: 'messageWish',
    component: MessageWish,
  },
  {
    path: `${routePrefix}/activity/rightspage`,
    name: 'rightsPage',
    component: RightsPage3,
  },
  {
    path: `${routePrefix}/activity/rightspage2`,
    name: 'rightsPage2',
    component: RightsPage2,
  },
  {
    path: `${routePrefix}/activity/lawday`,
    name: 'lawDay',
    component: LawDay,
  }
]
