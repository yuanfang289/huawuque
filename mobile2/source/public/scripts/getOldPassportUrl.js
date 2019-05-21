UR.getOldPassportUrl = function(pageName) {
    var location  = window.location,
        host      = location.protocol + '//',
        hostname  = location.hostname,
        href      = location.href;
    var hostNames = hostname.split('.'),
        devDomain = host + hostname,
        productDomain = host + 'passport.' + hostNames[1] + '.' + hostNames[2],
        path      = pageName ? '/passport/' + pageName + '?retUrl=' + encodeURIComponent(href) : '/passport/',
        url       = '';

    if (/^localhost/.test(hostname)) {
        url = devDomain + ':8085' + path;
    } else
    if (/^\d+(\.\d+){3}/.test(hostname)) {
        url = devDomain + ':8075' + path;
    } else
    if (/^\S+(\.\S+){2,}/.test(hostname)) {
        url = productDomain + path;
    }
    return url;
};
