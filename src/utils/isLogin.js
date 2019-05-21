import apiIsLoginUser from 'api/apiIsLoginUser';

/**
 * 判断当前用户登录状态
 *
 * @param {object}   options   参数{success: 登录成功回调, fail: 登录失败回调, error: 请求错误回调}
 */
export default function isLogin(options = {}) {
  apiIsLoginUser().then(res => {
    if (res.retCode === 0) {
      typeof options.success === 'function' && options.success(res);
    } else
    if (res.retCode === -2) {
      typeof options.fail === 'function' && options.fail(res);
    }
  }).catch(err => {
    typeof options.error === 'function' && options.error(err);
  });
}
