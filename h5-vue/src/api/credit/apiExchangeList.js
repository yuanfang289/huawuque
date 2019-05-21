/**
 * Created by xiezy on 2019/1/14.
 */
import {routePrehttp} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${routePrehttp}/points/exchange/list`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  },1)
}
