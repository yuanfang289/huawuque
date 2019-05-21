!function(win) {
    document.addEventListener('click', loginHandle, null);
    document.addEventListener('tap', loginHandle, null);

    function loginHandle(e) {
        var target    = e.target,
            className = target.className,
            href      = '';

        if (className.indexOf('js-login') != -1) {
            href = getUrl('login');
        } else
        if (className.indexOf('js-register') != -1) {
            href = getUrl('login') + '#register';
        } else
        if (className.indexOf('js-logout') != -1) {
            href = getUrl('logout');
        }

        if (!href) return false;

        win.location.href = href;
    }

    function getUrl(pageName) {
        var location = win.location,
            host     = location.protocol + '//',
            hostname = location.hostname,
            href     = location.href;
        var hostNames = hostname.split('.'),
            devDomain = host + hostname,
            testDomain = host + 'passport.test.urwork.cn',
            productDomain = host + 'passport2.' + hostNames[1] + '.' + hostNames[2],
            path     = '/passport/' + pageName + '?retUrl=' + encodeURIComponent(href),
            url      = '';

        if (/^localhost/.test(hostname)) {
            url = devDomain + ':8085' + path;
        } else
        if (/^\S+\.test(\.\S+){2,}/.test(hostname)) {
            url = testDomain + path;
        } else
        if (/^\S+(\.\S+){2,}/.test(hostname)) {
            url = productDomain + path;
        }
        return url;
    }
}(window);
