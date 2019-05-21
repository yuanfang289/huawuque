/*
 * version 1.0.2 */
+ function($) {
    var ajax = function(options) {
        var defaults = {
            url: '',
            type: 'GET',
            data: {},
            dataType: 'json',
            contentType: 'application/json',
            cache: true,
            beforeSend: null,
            submit: null,
            className: 'disabled',
        }

        options && typeof options === 'object' && (options = $.extend(defaults, options));

        if (options.type.match(/POST/gi)) {
            if (options.contentType == 'application/json') {
                options.data = JSON.stringify(options.data);
            }
        }


        /* 防止重复提交 */
        if (options.submit) {
            if (typeof options.submit == 'string' || (typeof options.submit == 'object' && !options.submit[0])) {
                options.$submit =  $(options.submit);
            }
        }

        if (options.$submit && options.$submit.hasClass(options.className)) {
            return false;
        }

        var canSubmit = true;
        if (options.beforeSend) {
            var beforeSend = options.beforeSend();
            if (typeof beforeSend == 'boolean' && !beforeSend) {
                canSubmit = false;
                return false;
            }
        }

        if (canSubmit && options.$submit) {
            options.$submit.addClass(options.className);
        }

        /* 防止重复提交 */


        var success = null,
            error   = null;
        if (options.success) {
            success = options.success;
            delete options.success;
        }
        if (options.error) {
            error = options.error;
            delete options.error;
        }
        var promise = $.ajax(options);
        promise.done(function(res) {
            if (res.retCode && res.retCode == -2) {
                var UR = window.UR;
                if (UR) {
                    if (UR.isApp && UR.isApp()) {
                        UR.openApp && UR.openApp.login && UR.openApp.login(location.href);
                        return;
                    } else {
                        UR.setPassportUrl && UR.setPassportUrl('login');
                        return;
                    }
                }
            }

            success && success(res);
        })
        promise.fail(function(res) {
            error && error();
            if (options.$submit) {
                options.$submit.removeClass(options.className);
            }
        })
        promise.always(function(res) {
        });
    }
    $.extend({
        /**
         * 时间日期格式化
         * Date <==> String
         * DateTime <==> string
         */
        dateFormat: function(date, formatted) {
            !formatted && (formatted = 'yyyy-MM-dd'); // 设置默认格式

            if (typeof date === "number") { // date为时间戳转成Date
                date = new Date(date);
            }

            if (typeof date === "object" && /^\s*date\s*$/gi.test(formatted)) {
                return date;
            }

            if (typeof date === "object" && !/^\s*datetime\s*$/gi.test(formatted)) {
                var o = {
                    "M+": date.getMonth() + 1, //月份
                    "d+": date.getDate(), //日
                    "h+": date.getHours(), //小时
                    "m+": date.getMinutes(), //分
                    "s+": date.getSeconds(), //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S" : date.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(formatted)) {
                    formatted = formatted.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                }

                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(formatted)) {
                        formatted = formatted.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }
                return formatted;
            }

            if (date && typeof date === "object" && /^\s*datetime\s*$/gi.test(formatted)) {
                return date.getTime();
            }

            if (typeof date === "string") {
                date = date.trim();

                if (formatted.match(/\bdate\b/gi)) { // string to Date
                    return new Date(+date.replace(/(\d{4}).(\d{1,2}).?(\d{0,2})\s*(\d{0,2}).?(\d{0,2}).?(\d{0,2}).?/mg, function(it, y, M, d, h, m, s) {
                        return new Date(y, M - 1, d, h, m, s).getTime();
                    }));
                }
                if (formatted.match(/\b(number|DateTime)\b/gi)) { // string to DateTime
                    return +date.replace(/(\d{4}).(\d{1,2}).?(\d{0,2})\s*(\d{0,2}).?(\d{0,2}).?(\d{0,2}).?/mg, function(it, y, M, d, h, m, s) {
                        return new Date(y, M - 1, d, h, m, s).getTime();
                    });
                }

                return date.replace(/(\d{4}).(\d{1,2}).?(\d{0,2})\s*(\d{0,2}).?(\d{0,2}).?(\d{0,2}).?/mg, function(it, y, M, d, h, m, s) {
                    if (/(y+)/.test(formatted)) {
                        formatted = formatted.replace(RegExp.$1, y);
                    }
                    var regArr = ['M+', 'd+', 'h+', 'm+', 's+'];
                    for (var i = 0, length = regArr.length; i < length; i++) {
                        if (new RegExp('(' + regArr[i] + ')').test(formatted)) {
                            var current = arguments[i + 2];
                            formatted = formatted.replace(RegExp.$1, (RegExp.$1.length == 1) ? current : (("00" + current).substr(("" + current).length)));
                        }
                    }

                    return formatted;
                });
            }
        },
        ajaxGet: function(options) { // ajax get 请求
            ajax($.extend(true, {
                type: 'GET',
                beforeSend: function(XHR) {},
            }, options));
        },
        ajaxPost: function(options) { // ajax post 请求
            ajax($.extend(true, {
                type: 'POST',
                beforeSend: function(XHR) {},
            }, options));
        }
    })
}(window.Zepto || jQuery)
