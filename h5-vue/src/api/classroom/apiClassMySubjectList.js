import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function() {
  return ajax(`${requestUrl}/subject/mySuhjectList`)
}
