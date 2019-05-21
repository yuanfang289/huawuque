import {routePrefix} from 'config/config';

const List   = () => import('app/market/CompanyList');
const Detail = () => import('app/market/CompanyDetail');
const CompanyPointsList = () => import('app/market/CompanyPointsList')
export default [
  // {
  //   path: `${routePrefix}/market/list`,
  //   name: 'companyList',
  //   component: List
  // },
  // {
  //   path: `${routePrefix}/market/detail/:id`,
  //   name: 'companyDetail',
  //   component: Detail
  // },
  {
    path: `${routePrefix}/market/points`,
    name: 'CompanyPointsList',
    component: CompanyPointsList
  }
]
