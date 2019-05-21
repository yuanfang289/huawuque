/**
 * Created by admin on 2019/1/23.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';
export default function(option,userid) {
  return ajax(`${requestUrl}/gateway/task/task/v1/replenish`, {
    data:option,
    type:'post',
    dataType:'json',
    processData:true
  },1)
}
