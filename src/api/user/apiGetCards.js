/**
 * Created by xiezy on 2018/12/6.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${requestUrl}/gateway/member-card/v1/getCardsPage`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  })
}
