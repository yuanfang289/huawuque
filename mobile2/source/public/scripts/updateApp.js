UR.updateApp = function(version, options) {
    options = options || {};
    UR.dialog.confirm({
        message: '当前客户端版本过低，不支持此功能。请更新客户端至' + version + '或以上版本',
        buttons: {
            yes: {
                label: '立即更新',
                fn: function() {
                    if (UR.clientTest.isIos) {
                        window.location.replace('https://itunes.apple.com/cn/app/you-ke-gong-chang/id1034170822?mt=8');
                    }
                    if (UR.clientTest.isAndroid) {
                        UR.setUrl('http://m.urwork.cn/android/urwork_urwork.apk');
                    }
                    options.yes && options.yes();
                }
            },
            no: {
                label: '取消',
                fn: function() {
                    options.no && options.no();
                }
            },
        }
    })
};
