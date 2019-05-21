/**
 * Created by 87402 on 2019/2/21.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${requestUrl}/makerActivity/send`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  })
}
