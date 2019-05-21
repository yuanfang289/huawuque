/**
 * Created by XieZy on 2018/9/30.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(data) {
  return ajax(`${requestUrl}/aggregation/task/home`, {
    data
  })
}
