import {requestUrl, domains, env} from 'config/config';
import {ajax, isUrworkApi} from 'utils';

export default function() {
  let api = requestUrl;
  if (!isUrworkApi()) {
    api = env.PROD ? domains.prodDomain2 : domains.testDomain2;
  }
  return ajax(`${api}/passport/getNationalCodes`)
}
