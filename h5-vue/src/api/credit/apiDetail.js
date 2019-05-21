/**
 * Created by xiezy on 2018/10/8.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${requestUrl}/gateway/account/account/v1/getUserPointsPage`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  })
}

