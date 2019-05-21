/**
 * Created by xiezy on 2018/12/3.
 */
import {routePrefix} from 'config/config';

const Credit = () => import('app/credit/Index');
const Rule = () => import('app/credit/Rule');
const Task = () => import('app/credit/Task');
const ChildTask = () => import('app/credit/ChildTask');
const Prize = () => import('app/credit/Prize');
const GiftExchange = () => import('app/credit/GiftExchange');
const MyAccount = () => import('app/credit/MyAccount');
const LotteryDraw = () => import('app/credit/LotteryDraw');
export default [
  {
    path: `${routePrefix}/credit`,
    name: 'credit',
    component: Credit,
  },
  {
    path: `${routePrefix}/credit/rule`,
    name: 'credit-rule',
    component: Rule,
  },
  {
    path: `${routePrefix}/credit/task`,
    name: 'credit-task',
    component: Task,
  },
  {
    path: `${routePrefix}/credit/childtask`,
    name: 'childTask',
    component: ChildTask,
  },
  {
    path: `${routePrefix}/credit/prize`,
    name: 'prize',
    component: Prize,
  },
  {
    path: `${routePrefix}/credit/giftExchange`,
    name: 'giftExchange',
    component: GiftExchange,
  },
  {
    path: `${routePrefix}/credit/myAccount`,
    name: 'myAccount',
    component: MyAccount,
  },
  {
    path: `${routePrefix}/credit/lotteryDraw`,
    name: 'lotteryDraw',
    component: LotteryDraw,
  }
]
