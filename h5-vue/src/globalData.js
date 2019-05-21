import {passportParams} from 'config/feature';

// 初始化passport方法
import passportInit from 'vendor/passport/passport_es6';
export const passport = passportInit(passportParams);

/**
 * @property routerTimer 后退按钮hack
 * @desc 查看router.js 和 Goto.vue 及 TopbarBack.vue
 */
export default {
  routerTimer: undefined
}
