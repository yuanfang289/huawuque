import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${requestUrl}/memberPackage/putCoupon`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  })
}
