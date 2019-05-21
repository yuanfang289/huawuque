UR.getPassportUrl = function(pageName) {
    var h = UR.getHost();
    var o = h.origin;

    var hostNames = o.hostname.split('.'),
        devDomain = o.protocol + o.hostname,
        testDomain = o.protocol + 'passport.test.urwork.cn',
        productDomain = o.protocol + 'passport2.' + hostNames[1] + '.' + hostNames[2],
        path      = pageName ? '/passport/' + pageName + '?retUrl=' + encodeURIComponent(o.href) : '/passport/',
        url       = '';

    if (h.env == 'local') {
        url = devDomain + ':8085' + path;
    } else
    if (h.env == 'test') {
        url = testDomain + path;
    } else
    if (h.env == 'production') {
        url = productDomain + path;
    }

    return url;
}
