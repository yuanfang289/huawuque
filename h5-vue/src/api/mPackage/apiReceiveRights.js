/**
 * Created by 87402 on 2019/3/21.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`https://gateway.urwork.cn/member-gift/order/receiveRights`, {
    data:option,
    type:'post',
    dataType:'json',
    processData:true
  },1,1)
}

