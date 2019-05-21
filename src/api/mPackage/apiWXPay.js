/**
 * Created by 87402 on 2019/3/20.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';
export default function(option) {
  return ajax(`https://m.urwork.cn/gateway2/pay/payment/v1/weixinGzh`, {
    data:option,
    type:'post',
    dataType:'json',
    processData:true
  },1,1)
}
