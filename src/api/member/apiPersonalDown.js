/**
 * Created by admin on 2019/4/18.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(data) {
  return ajax(`${requestUrl}/v4/member/personal/down`, {
    data
  })
}
