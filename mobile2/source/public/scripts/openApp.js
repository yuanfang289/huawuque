UR.openApp = (function() {
    var ua = window.navigator.userAgent;

    var android = /(Android);?[\s\/]+([\d.]+)?/i,
        ipad = /(iPad).*OS\s([\d_]+)/i,
        iphone = /(iPhone\sOS)\s([\d_]+)/i;

    var _ipad = ua.match(ipad),
        _iphone = ua.match(iphone),
        isIos = _ipad || _iphone,
        isAndroid = ua.match(android),
        isSafari = isIos && ua.match(/Safari/i),
        isChrome = ua.match(/Chrome/i) && !ua.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i),
        isWechat = ua.match(/MicroMessenger/i),
        isQQ = ua.match(/[^M]QQ\//i);

    var iosVer = (_ipad && getIosVer(_ipad[2])) || (_iphone && getIosVer(_iphone[2])) || 0;

    var iframeId = 'plugin_loadIframe';
    var loadIframe = null;
    var timerList = []; // 计时器列表

    window.onblur = clearTimer;


    // 窗口焦点消失时，清除所有计时器
    function clearTimer() {
        for (var i = 0; i < timerList.length; i++) {
            clearTimeout(timerList[i]);
        }
    }

    // 获取ios系统版本
    function getIosVer(str) {
        var temp = str.split('_');
        return parseFloat(temp.join('.'));
    }

    // 超时跳转
    function timeout(time, url) {
        var now = Date.now();
        if (time && (now - time) < (1500 + 200)) {
            window.location.href = url;
        }
    }

    // 生成url
    function createUrl(params) {
        if (params.intentUrlParams) {
            params.chromeUrl = params.appUrl;
            params.appUrl = params.appUrl + '?url=' + encodeURIComponent(params.intentUrlParams);
            params.iosAppUrl = params.iosAppUrl + '?url=' + encodeURIComponent(params.intentUrlParams);
        }
        return params;
    }

    // 读取参数
    function getArgs(params) {
        // 默认参数
        var def = {
            downAppUrl: 'https://mtest.urwork.cn/goDownload',
            downWeixin: 'http://a.app.qq.com/o/simple.jsp?pkgname=cn.urwork.www',
            appUrl: 'urwork://webPage',
            iosAppUrl: 'https://mtest.urwork.cn/goDownload',
            intentUrlParams: null // 接收的参数
        };

        if (params) {
            for (var prop in params) {
                if (prop && params[prop]) {
                    def[prop] = params[prop];
                }
            }
        }
        return def;
    }

    // 重定向
    function redirect(params, isJump) {
        var openUrl = createUrl(params);
        console.log(openUrl);
        var downUrl = null;

        // 微信或QQ中
        if (isWechat || isQQ) {
            var url = null;
            // 如果微信检测到app已安装, 打开app
            // 否则在微信中下载app
            if (iosVer >= 9.2) {
                url = openUrl.iosAppUrl;
            } else {
                // 微信中下载app
                url = params.downWeixin;
            }
            location.href = url;
            return;
        }

        if (isIos) {
            // app store
            downUrl = params.downAppUrl;
        } else {
            // app download page
            downUrl = params.downAppUrl;
        }

        // 安卓chrome
        if (isAndroid) {
            if (isChrome) {
                openUrl.appUrl = 'intent://cn.urwork.www/#Intent;scheme=' + openUrl.chromeUrl + ';package=cn.urwork.www;S.chromeUrl=' + encodeURIComponent(openUrl.intentUrlParams) + ';end';
                console.log('chromeAppUrl: ', openUrl.appUrl);
                setTimeout(function() {
                    window.location.href = openUrl.appUrl;
                }, 50)
            }
        }

        // 如果是safari 且 ios版本大于等于9.2，则执行ios接口
        // 否则走统一接口
        if (isIos && iosVer >= 9.2) {
            window.location.href = openUrl.iosAppUrl;
            return;
        } else {
            // 安卓及ios9.2一下和其他浏览器，走此逻辑
            document.querySelector("#" + iframeId).src = openUrl.appUrl;
        }

        // 超时跳转下载页
        var sTime = Date.now();
        setTimeout(function() {
            if (isJump) {
                var timer = setTimeout(function() {
                    timeout(sTime, downUrl);
                }, 1500);
                timerList.push(timer);
            }
        }, 100)
    }

    // getIntentIframe
    function getIntentIframe(params) {
        if (!loadIframe) {
            var iframe = document.createElement("iframe");
            iframe.id = iframeId;
            document.body.appendChild(iframe);
            document.getElementById(iframeId).style.display = "none";
            document.getElementById(iframeId).style.width = "0px";
            document.getElementById(iframeId).style.height = "0px";
            loadIframe = true;
        }
        redirect(params, true);
    }


    return {
        init: function(params, cancelFn) {
            UR.dialog.confirm({
                message: '打开优客工场APP？',
                buttons: {
                    yes: {
                        label: '打开',
                        fn: function() {
                            getIntentIframe(getArgs(params));
                        }
                    },
                    no: {
                        label: '放弃',
                        fn: function() {
                            cancelFn && cancelFn()
                        }
                    },
                }
            })
        },
        isAndroid: !!isAndroid,
        isIos: !!isIos,
        qrcode: function() {
            UR.setUrl('urwork://qrcode');
        },
        login: function(redirect) {
            var url = 'urwork://login' + (redirect ? '?redirect=' + encodeURIComponent(redirect) : '');
            UR.setUrl(url);
        },
        setUrl: function(url) {
            UR.setUrl('urwork://' + encodeURIComponent(url));
        }
    };
})();
