/**
 *
 * @param ios {String}  如：'2.3.1'
 * @param android {String | Function}  如：'2.3.1'
 * @param success {Function} 版本适配时的回调函数
 * @param fail    {Function} 版本不匹配时执行自定义逻辑
 */
UR.appVersionHold = function(ios, android, success, fail) {
    if (arguments.length === 2) {
        success = android;
        android = ios;
    }

    var version = DANativeApi.apiVersion || '';

    if (+version.replace(/\./g, '') >= (UR.clientTest.isIos ? parse(ios) : parse(android))) {
        typeof success === 'function' && success();
    } else {
        if (arguments[3]) {
            typeof fail === 'function' && fail();
        } else {
            UR.updateApp(UR.clientTest.isIos ? ios : android);
        }
        this.lock = false;
    }

    function parse(string) {
        return +string.split('.').join('')
    }
};
