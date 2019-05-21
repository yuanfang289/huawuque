import { message } from 'antd';
//生产环境还是开发环境
const getApi = process.env.NODE_ENV === 'production' ? 'https://downfuture.com:9000/api/v1/' : 'http://localhost:9000/api/v1/';
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
function parseJSON(response) {
  return response.json();
}
function request({ url, options, callback }) {
  options.mode = "cors";
  if(!options.sign) {
    options.headers = {
      'Content-Type': 'application/json'
    };
    if(!(options.method === 'GET' || options.method === 'DELETE')) {
      options.body = JSON.stringify(options.body);
    };
  }
  options.credentials = 'include';
  return fetch(getApi + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      return data;
    }).catch((err) => {
      message.error('发送fetch失败' + JSON.stringify(err) + ',方法名：' + url);
    });
}

export { request };