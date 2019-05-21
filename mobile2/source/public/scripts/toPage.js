UR.toPage = {};

UR.toPage.toPageisLogin = function (url, _this) {
    UR.isLogin(function() {
        UR.setUrl(url);
        _this.lock = false;
    }, function() {
        UR.toLogin(url);
    }, function() {
        _this.lock = false;
    })
};

UR.toPage.toNativePage = function(url, _this, version, requiredLogin) {
    if (_this.lock) return;
    _this.lock = true;

    if (UR.isApp()) {
        if (version) {
            UR.appVersionHold.call(_this, version.ios, version.android, function() {
                inApp()
            })
        } else {
            inApp()
        }
    } else {
        UR.openApp.init({
            intentUrlParams: url
        });
        _this.lock = false;
    }

    function inApp () {
        if (!requiredLogin) {
            UR.setUrl(url);
            _this.lock = false;
            return;
        }

        UR.isLogin(function() {
            UR.setUrl(url);
            _this.lock = false;
        }, function() {
            UR.openApp.login(location.href);
            _this.lock = false;
        }, function() {
            _this.lock = false;
        })
    }
};
