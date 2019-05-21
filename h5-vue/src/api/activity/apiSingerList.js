/**
 * Created by Xiezy on 2018/10/29.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(data) {
  return ajax(`${requestUrl}/voice/urwork/playerList`, {
    data
  })
}
