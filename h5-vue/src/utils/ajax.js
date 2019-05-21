import app from 'src/app';
import axios from 'axios';
import {stringify} from 'qs';
import {passport} from "src/globalData";


/**
 *
 * @desc 参数参考 jQuery ajax
 *
 * @param {string} url                         接口地址
 * @param {object} options                     其他参数
 * @property {function} options.success        请求成功回调
 * @property {function} options.fail           请求失败回调
 * @property {function} options.complete       请求发出回调
 * @property {function} options.beforeSend     请求前的处理函数，可以在这里修改data参数
 * @property {string}   options.type           请求方式get|post等，默认get
 * @property {string}   options.contentType    设置请求头的'Content-Type'，
 *                                             可用参数{'json': 对应'application/json'}或者直接传'application/*'
 * @property {object}   options.data           请求数据
 * @property {boolean}  options.cache          是否缓存请求，默认 true[缓存]
 * @property {boolean}  options.processData    是否将数据处理成form body格式，如：`a=0&b=1`，默认false
 *
 * @returns {Promise<Response>}
 */

export default function ajax(url, options = {},all=0,cross=0) {
  const success  = options.success;
  const fail     = options.fail;
  const complete = options.complete;
  const beforeSend = options.beforeSend;


  const processData = options.processData === undefined ? false : options.processData;
  const methods = ['put', 'post', 'patch'];
  const method  = options.type || 'get';
  const data    = options.data || {};

  // 是否缓存请求，默认不缓存
  const cache   = options.cache === undefined ? true : options.cache;

  const timestamp = Date.now().toString(32);

  options.headers = options.headers || {};

    options.headers['server']='test';


  options.contentType = options.contentType || '';

  const contentType = options.contentType.toLowerCase();

if(cross==1){
  axios.defaults.withCredentials=true;
  axios.defaults.crossDomain = true;
}
  if(contentType) {
    if (contentType === 'json') {
      options.headers['Content-Type'] = 'application/json'
    } else {
      options.headers['Content-Type'] = options.contentType;
    }
  }

  // 清理选项
  delete options.url;
  delete options.success;
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
    options.data = contentType === 'json' ? JSON.stringify(data) : (processData ? stringify(data) : data);
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

  return new Promise((resolve, reject) => {
    axios(url, options)
    .then(res => {
      let data = res.data;
      if(all){
        data=res;
      }

      /**
       * @desc {number} retCode    接口统一的状态码  {0: 请求成功, -2: 未登录, 其他：异常状态}
       */

      if (data.retCode === 0) {
        typeof success === 'function' && success(data.data);
      } else
      if (data.retCode === -2) {
        passport.toLogin();
      } else {
        console.log('request fail: ', data.retMsg);
      }
      if(!data.data){
        console.log("data.retCode",data.retCode)
        data.data=data.retCode;
      }
      resolve(data.data);
    })
    .catch(err => {
      app.$toast('网络错误，请稍后重试');
      typeof fail === 'function' && fail(err.response);
      reject(err.response);
    });
  })
}
