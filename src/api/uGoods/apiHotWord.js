/**
 * Created by admin on 2018/11/22.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${requestUrl}/hotword/get/ugift`, option)
}
