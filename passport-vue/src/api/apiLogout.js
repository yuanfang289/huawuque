import {requestUrl, domains, env} from 'config/config';
import axios from 'axios';
import {getLocation, isUrworkApi} from 'utils';

export default function() {
  let {
    PROD,
    TEST
  } = env;
  let protocol = PROD || TEST ? getLocation().protocol : '';

  let api = requestUrl;
  if (!isUrworkApi()) {
    api = PROD ? domains.prodDomain2 : domains.testDomain2;
  }

  return new Promise((resolve, reject) => {

    const timestamp = Date.now().toString(32);
    axios(`${protocol + api}/login/h5logout?timestamp=${timestamp}`, {
      withCredentials: true
    }).then(({data}) => {
      resolve(data.success);
    }).catch(err => {
      reject(err);
    })
  })
}
