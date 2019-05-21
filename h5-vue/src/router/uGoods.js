import {routePrefix} from 'config/config';

const Index   = () => import('app/uGoods/Index');
const Search   = () => import('app/uGoods/Search');
const Classify   = () => import('app/uGoods/Classify');

export default [
  {
    path: `${routePrefix}/uGoods/index`,
    name: 'uGoodsIndex',
    component: Index
  },
  {
    path: `${routePrefix}/uGoods/search`,
    name: 'search',
    component: Search
  },
  {
    path: `${routePrefix}/uGoods/classify`,
    name: 'classify',
    component: Classify
  }
]
