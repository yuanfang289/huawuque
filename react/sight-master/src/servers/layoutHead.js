import { request } from '../request';

export function fetchAvatar() {
  return request({
    url: 'personal',
    options: {
      method: 'GET'
    }
  });
}