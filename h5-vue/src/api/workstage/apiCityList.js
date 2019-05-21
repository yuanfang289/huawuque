/**
 * Created by xiezy on 2018/11/21.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(data) {
  return ajax(`${requestUrl}/workstage/getAllCity`, {
    data
  })
}
