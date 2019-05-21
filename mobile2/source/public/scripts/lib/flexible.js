;(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var dpr = win.devicePixelRatio;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    var orientation = getOrientation(); // 0 竖屏, 1 横屏

    docEl.setAttribute('data-dpr', dpr);

    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
        if (doc.querySelector('head')) {
            docEl.firstElementChild.appendChild(metaEl);
        }
    }

    function getOrientation() {
        // 0 竖屏, 1 横屏
        var orientation = window.orientation;
        if (orientation == 0 || orientation == 180) {
            return 0;
        } else
        if (orientation == 90 || orientation == -90) {
            return 1;
        }
    }

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width > 540) {
            width = 540;
        }
        if (width < 375) {
            width = 375;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
    win.addEventListener('orientationchange', function(e) {
        var _orientation = getOrientation();
        if (orientation != _orientation) {
            flexible.orientation = orientation = _orientation;
            // 如果不是APP内，则刷新页面
            // if (window.webkit || window.androidJsInterface || document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
            //     return
            // }
            // window.location.reload();
        }
    }, false);

    refreshRem();

    flexible.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.orientation = orientation;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['UR'] || (window['UR'] = {}));
