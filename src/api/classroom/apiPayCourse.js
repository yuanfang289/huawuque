/**
 * Created by XieZy on 2018/10/18.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${requestUrl}/productPay/submitCart`, {
    data:option.data,
    type:'get',
    dataType:'json',
    processData:true
  })
}
