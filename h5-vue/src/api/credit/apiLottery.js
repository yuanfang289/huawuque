/**
 * Created by admin on 2019/1/15.
 */
import {routePrehttp} from 'config/config';
import {ajax} from 'utils';
export default function(option,userid) {
  return ajax(`${routePrehttp}/points/lottery/`, {
    data:option,
    type:'post',
    dataType:'json',
    processData:true,
    headers:{userId:userid}
  },1)
}
