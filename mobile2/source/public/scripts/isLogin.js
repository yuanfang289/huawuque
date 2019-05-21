/**
 *
 * @param success  登录成功回调
 * @param fail     登录失败回调
 * @param error    请求错误回调
 *
 */
UR.isLogin = function(success, fail, error) {
    var args = arguments;

    return $.ajax({
        url: '/support/isLoginUser',
        type: 'get',
        dataType: 'json'
    }).done(function(res) {
        // 兼容老版本只要一个参数的情况
        if (args.length === 1) {
            success(res);
            return
        }

        if (res.success) {
            success(res);
        } else {
            fail();
        }
    }).fail(function(err) {
        error && error(err);
    })
};
