/**
 * Created by 87402 on 2019/3/21.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`https://gateway.urwork.cn/member-gift/order/list`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  },0,1)
}
