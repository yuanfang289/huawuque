import { request } from '../request';

export function fetchUploadAvatar(params) {
  return request({
    url: 'uploadAvatar',
    options: {
      method: 'PUT',
      body: params.formData,
      sign: true
    }
  });
}

export function fetchImages(params) {
  return request({
    url: `getImages?count=${params.count}`,
    options: {
      method: 'GET'
    }
  });
}

export function fetchSignOut() {
  return request({
    url: 'signOut',
    options: {
      method: 'DELETE'
    }
  });
}