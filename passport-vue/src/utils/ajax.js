import axios from 'axios';
import qs from 'qs';
import {getLocation} from 'utils';
import {env} from 'config/config';

/**
 *
 * @desc 参数参考 jQuery ajax
 *
 * @param {string} url                     接口地址
 * @param {object} options                 其他参数
 * @property {function} options.success    请求成功回调
 * @property {function} options.retCodeError    请求成功回调,但返回码不正确
 * @property {function} options.fail       请求失败回调
 * @property {function} options.complete   请求发出回调
 * @property {function} options.beforeSend 请求前的处理函数，可以在这里修改data参数
 * @property {string}   options.type       请求方式get|post等，默认get
 * @property {string}   options.contentType    设置请求头的'Content-Type'，
 *                                             可用参数{'json': 对应'application/json'}或者直接传'application/*'
 * @property {object}   options.data       请求数据
 * @property {boolean}  options.cache      是否缓存请求，默认 true[缓存]
 *
 * @returns {Promise<Response>}
 */

export default function ajax(url, options = {}) {
  let {
    PROD,
    TEST
  } = env;

  let protocol = PROD || TEST ? getLocation().protocol : '';

  const success  = options.success;
  const retCodeError = options.retCodeError;
  const fail     = options.fail;
  const complete = options.complete;
  const beforeSend = options.beforeSend;

  const methods = ['put', 'post', 'patch'];
  const method  = options.type || 'get';
  let   data    = options.data || {};

  //  是否表单提交
  const processData = options.processData || false;

  // 是否缓存请求，默认不缓存
  const cache   = options.cache === undefined ? true : options.cache;

  const timestamp = Date.now().toString(32);

  options.headers = options.headers || {};
  options.contentType = options.contentType || '';

  const contentType = options.contentType.toLowerCase();

  if(contentType) {
    if (contentType === 'json') {
      options.headers['Content-Type'] = 'application/json'
    } else {
      options.headers['Content-Type'] = options.contentType;
    }
  }

  if(processData) {
    data = qs.stringify(data);
  }

  // 清理选项
  delete options.url;
  delete options.success;
  delete options.retCodeError;
  delete options.fail;
  delete options.complete;
  delete options.transformResponse;
  delete options.data;
  delete options.params;
  delete options.type;
  delete options.beforeSend;
  delete options.cache;
  delete options.contentType;
  delete options.processData;

  options.method = method;

  if (methods.includes(method.toLowerCase())) {
    if (cache) {
      url += `?timestamp=${timestamp}`;
    }
    options.data = contentType === 'json' ? JSON.stringify(data) : data;
  } else {
    if (cache) {
      data.timestamp = timestamp;
    }
    options.params = data;
  }

  // 发送前的处理
  options.transformRequest = [function(res) {
    if (typeof beforeSend === 'function') {
      return beforeSend(res);
    } else {
      return res;
    }
  }];

  // then/catch 之前处理
  options.transformResponse = [function(res) {
    res = JSON.parse(res);
    typeof complete === 'function' && complete(res);
    return res;
  }];

  options.withCredentials = true;

  return new Promise((resolve, reject) => {
    axios(protocol + url, options)
      .then(res => {
        let data = res.data;
        if (data.retCode === 0) {
          typeof success === 'function' && success(data.data || data);
        } else {
          typeof retCodeError === 'function' && retCodeError(data.data || data);
          console.log('request fail: ', data.retMsg);
        }

        resolve(data.data || data);
      })
      .catch(err => {
        let {
          status
        } = err.response;

        if (status >= 500) {

        }

        typeof fail === 'function' && fail(err);
        reject(err);
      });
  })
}
