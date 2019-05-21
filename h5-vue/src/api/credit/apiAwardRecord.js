/**
 * Created by admin on 2019/1/15.
 */
import {routePrehttp} from 'config/config';
import {ajax} from 'utils';

export default function(option,userid) {
  return ajax(`${routePrehttp}/points/lottery/queryAwardRecord`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true,
      headers:{userId:userid}
  },1)
}
