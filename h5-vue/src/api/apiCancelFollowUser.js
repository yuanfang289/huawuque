/**
 * Created by XieZy on 2018/9/25.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(data) {
  return ajax(`${requestUrl}/user/cancelFollow`, {
    data
  })
}
