/**
 * Created by xiezhi on 2018/11/5.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {

  return ajax(`${requestUrl}/login/inviteReg`, option)

  // return ajax(`http://192.168.143.220:8085/login/inviteReg`, option)
}
