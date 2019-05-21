UR.config = {
    // 环境变量参数
    ENV_VAR: $.extend({}, window.ENV_VAR),
    // 公用api
    apiUrl: {
        test: '/test',    // 示例
    },
    ajaxError: function() {
        UR.msg('网络错误请重试');
    },
    host: function() {
        return window.location.protocol + '//' + window.location.host;
    },
    getApiUrl: function() {
        var obj = {};
        Object.defineProperty(obj, 'length', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: 0
        })
        for (var prop in this.apiUrl) {
            obj[prop] = this.host() + this.apiUrl[prop];
            obj.length++;
        }
        return obj
    }
};

UR.api  = UR.config.getApiUrl();
UR.env  = UR.config.ENV_VAR;
UR.host = UR.config.host();
UR.ajaxError = UR.config.ajaxError;
UR.isIos = UR.clientTest.isIos;
UR.isAndroid = UR.clientTest.isAndroid;
