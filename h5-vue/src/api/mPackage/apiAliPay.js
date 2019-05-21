import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`https://m.urwork.cn/gateway2/pay/payment/v1/alipayH5`, {
    data:option,
    type:'post',
    dataType:'json',
    processData:true
  },1,1)
}
