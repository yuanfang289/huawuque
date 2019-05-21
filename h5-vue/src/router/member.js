/**
 * Created by admin on 2019/4/10.
 */
import {routePrefix} from 'config/config';

const Company = () => import('app/member/company');
const Personal = () => import('app/member/personal')
export default [
  {
    path: `/v3/member/company`,
    name: 'v3-member-company',
    component: Company
  },
  {
    path: `/v3/member/personal`,
    name: 'v3-member-personal',
    component: Personal
  }
]
