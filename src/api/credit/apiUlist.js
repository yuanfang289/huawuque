/**
 * Created by admin on 2019/1/17.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${requestUrl}/gateway/account/account/v1/getUPointPage`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  })
}
