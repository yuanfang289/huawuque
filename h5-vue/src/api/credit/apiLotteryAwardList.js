/**
 * Created by admin on 2019/1/15.
 */
import {routePrehttp} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${routePrehttp}/points/lottery/getAwardList`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  },1)
}
