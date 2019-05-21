import { request } from '../request';

export function fetchGetPostDetail(postId) {
  return request({
    url: `getPostDetail?postId=${postId}`,
    options: {
      method: 'GET'
    }
  });
}