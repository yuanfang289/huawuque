import { request } from '../request';

export function fetchPasswordChange(params) {
  return request({
    url: 'passwordChange',
    options: {
      body: params.values,
      method: 'PUT'
    }
  });
}