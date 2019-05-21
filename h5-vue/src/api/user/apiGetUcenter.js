/**
 * Created by xiezy on 2018/12/6.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(data) {
  return ajax(`${requestUrl}/user/ucenter`, {
    data
  })
}
