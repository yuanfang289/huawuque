/**
 * Created by xiezy on 2018/11/21.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';
export default function(option) {
  return ajax(`${requestUrl}/workstage/list`, {
    data:option,
    type:'get',
    dataType:'json',
  })
}
