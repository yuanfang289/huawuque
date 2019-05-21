import {requestUrl} from 'config/config';
import axios from 'axios';

export default function() {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now().toString(32);
    axios(`${requestUrl}/support/isLoginUserNew?timestamp=${timestamp}`).then(({data}) => {
      resolve(data);
    }).catch(err => {
      reject(err.response);
    })
  })
}
