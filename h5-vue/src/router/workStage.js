/**
 * Created by xiezy on 2018/11/20.
 */
import {routePrefix} from 'config/config';
const Index   = () => import('app/workStage/Index');
const StageList   = () => import('app/workStage/StageList');
const CityList   = () => import('app/workStage/CityList');
const Visit = () => import('app/visit/Index');

export default [
  {
    path: `/v3/workStage`,
    name: 'v3-workstatge',
    component: Index,
  },
  {
    path: `${routePrefix}/workStage/stageList`,
    name: 'stageList',
    component: StageList,
  },
  {
    path: `${routePrefix}/workStage/cityList`,
    name: 'cityList',
    component: CityList,
  },
  {
    path: `${routePrefix}/visit`,
    name: 'visit',
    component: Visit,
  }
]
