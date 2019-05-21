/**
 * Created by XieZy on 2018/9/30.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';
export default function(option) {
  return ajax(`${requestUrl}/gateway/task/task/v1/monthcheckindata`, {
    data:option.data,
    type:'get',
    dataType:'json',
    processData:true
  })
}
