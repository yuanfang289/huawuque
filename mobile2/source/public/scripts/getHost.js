/**
 *
 * @param options 传入不同环境指定的URL，会根据不同的环境返回相对应的URL
 * @returns {{env: *, url: *, origin: {href, protocol: string, hostname, port, origin: *}}}
 */
UR.getHost = function(options) {
    var defs = {
        local     : '',
        test      : '',
        production: '',
    };
    var sets = $.extend({}, defs, options);

    var location  = window.location,
        protocol  = location.protocol + '//',
        hostname  = location.hostname,
        href      = location.href,
        port      = location.port;

    var hostNames = hostname.split('.'),
        devDomain = protocol + hostname,
        productDomain = protocol + hostname,
        origin, url, env;

    if (/^localhost/.test(hostname)) {
        origin = devDomain;
        url    = sets.local;
        env    = 'local';
    } else
    if (/^\S+\.test(\.\S+){2,}/.test(hostname) || /^\d+(\.\d+){3}/.test(hostname)) {
        origin = devDomain;
        url    = sets.test;
        env    = 'test';
    } else
    if (/^\S+(\.\S+){2,}/.test(hostname)) {
        origin = productDomain;
        url    = sets.production;
        env    = 'production';
    }

    return {
        env : env,
        url: url,
        origin: {
            href: href,
            protocol: protocol,
            hostname: hostname,
            port: port,
            origin: origin
        },
    }
};
