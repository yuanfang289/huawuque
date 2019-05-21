import { request } from '../request';

export function fetchRegister(params) {
  return request({
    url: 'register',
    options: {
      body: params.values,
      method: 'POST'
    }
  });
}

export function fetchUpdatePassword(params) {
  return request({
    url: 'updatePassword',
    options: {
      method: 'PUT',
      body: params.values
    }
  });
}

export function fetchLogin(params) {
  const { account, password } = params.values;
  return request({
    url: `login?account=${account}&password=${password}`,
    options: {
      method: 'GET'
    }
  });
}

export function fetchCode(params) {
  const { number, phone } = params;
  return request({
    url: `code?phone=${phone}&number=${number}`,
    options: {
      method: 'GET'
    }
  });
}