/**
 * Created by xiezy on 2018/12/10.
 */

import {requestUrl} from 'config/config';
import {httpapi3} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${httpapi3}/gateway/member-rights/coupon/skis/ticketCode`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  })
}
