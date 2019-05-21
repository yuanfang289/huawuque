import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(data) {
  return ajax(`${requestUrl}/companyVideo/getVideoList`, {
    data
  })
}
