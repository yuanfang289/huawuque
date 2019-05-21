import {domains, env, requestUrl} from 'config/config';
import {ajax, isUrworkApi} from 'utils';

export default function(data) {
  let api = requestUrl;
  if (!isUrworkApi()) {
    api = env.PROD ? domains.prodDomain2 : domains.testDomain2;
  }
  return ajax(`${api}/sendSmsLoginCode`, {
    type: 'post',
    data
  })
}
