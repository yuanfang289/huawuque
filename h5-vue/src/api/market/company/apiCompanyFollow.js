import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${requestUrl}/market/follow`,option)
}
