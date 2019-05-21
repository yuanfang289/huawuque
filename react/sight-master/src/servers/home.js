import { request } from '../request';

export function fetchData(params) {
  return request({
    url: `home?count=${params.count}`,
    options: {
      method: 'GET'
    }
  });
}

export function fetchIsLogin(params) {
  return request({
    url: 'isLogin',
    options: {
      method: 'GET'
    }
  });
}