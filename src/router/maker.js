/**
 * Created by xiezy on 2019/02/19.
 */
import {routePrefix} from 'config/config';

const maker = () => import('app/maker/Index');
const makerSuccess = () => import('app/maker/Success');
export default [
  {
    path: `${routePrefix}/maker`,
    name: 'maker',
    component: maker,
  },
  {
    path: `${routePrefix}/makerSuccess`,
    name: 'makerSuccess',
    component: makerSuccess,
  },

]

