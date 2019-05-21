/**
 * Created by xiezy on 2018/11/21.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(data) {
  return ajax(`${requestUrl}/index/v4/hotCity`, {
    data
  })
}
