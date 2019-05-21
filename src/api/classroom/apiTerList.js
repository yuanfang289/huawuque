/**
 * Created by Administrator on 2018/9/20.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(data) {
  return ajax(`${requestUrl}/activity/getUserList`, {
    data
  })
}
