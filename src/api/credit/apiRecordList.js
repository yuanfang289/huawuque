/**
 * Created by admin on 2019/1/17.
 */
import {routePrehttp} from 'config/config';
import {ajax} from 'utils';

export default function(option,userid) {
  return ajax(`${routePrehttp}/points/exchange/record/list`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true,
    headers:{userId:userid}
  },1)
}
