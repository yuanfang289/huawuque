import {routePrefix} from 'config/config';

const List   = () => import('app/mPackage/index');
const OrderList   = () => import('app/mPackage/OrderList');
const ToPay   = () => import('app/mPackage/ToPay');
const Detail   = () => import('app/mPackage/Detail');
const RightsList   = () => import('app/mPackage/RightsList');
const GiftContent   = () => import('app/mPackage/GiftContent');
const CouponDetail   = () => import('app/mPackage/CouponDetail');
export default [
  {
    path: `${routePrefix}/mPackage/list`,
    name: 'packageList',
    component: List
  },
  {
    path: `${routePrefix}/mPackage/orderList`,
    name: 'OrderList',
    component: OrderList
  },
  {
    path: `${routePrefix}/mPackage/toPay`,
    name: 'package-ToPay',
    component: ToPay
  },
  {
    path: `${routePrefix}/mPackage/Detail`,
    name: 'package-detail',
    component: Detail
  },
  {
    path: `${routePrefix}/mPackage/rightsList`,
    name: 'mrights',
    component: RightsList
  },
  {
    path: `${routePrefix}/mPackage/giftContent`,
    name: 'giftContent',
    component: GiftContent
  },
  {
    path: `${routePrefix}/mPackage/couponDetail`,
    name: 'package-couponDetail',
    component: CouponDetail
  }
]
