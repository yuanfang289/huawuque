import {routePrefix} from 'config/config';

const VideoList   = () => import('app/video/VideoList');

export default [
  {
    path: `${routePrefix}/video/videoList`,
    name: 'videoList',
    component: VideoList,
  }
]
