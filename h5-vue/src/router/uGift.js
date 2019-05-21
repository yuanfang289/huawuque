/**
 * Created by xiezy on 2019/01/03.
 */
import {routePrefix} from 'config/config';

const Ugift = () => import('app/uGift/Index');
const OrderDetail = () => import('app/uGift/OrderDetail');

export default [
  {
    path: `${routePrefix}/ugift`,
    name: 'ugift',
    component: Ugift,
  },
  {
    path: `${routePrefix}/ugift/orderDetail`,
    name: 'orderDetail',
    component: OrderDetail,
  }
]

