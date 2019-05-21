!(function (window, document, undefined) {
  function Passport(domains) {
    this.domains    = domains;
    this.runtimeEnv = Passport.runtimeEnv();
  }

  Passport.prototype = {
    isLogin: function (options) {
      options = options || {};
      var success  = typeof options.success  === 'function' ? options.success  : function() {};    // 登录成功
      var fail     = typeof options.fail     === 'function' ? options.fail     : function() {};    // 登录失败
      var error    = typeof options.error    === 'function' ? options.error    : function() {};    // 接口请求错误
      var xhr = new XMLHttpRequest();

      xhr.onload = function() {
        var res = this.response || {};
        if (res.success) {
          success(res);
        } else {
          fail();
        }
      };
      xhr.onerror = function() {
        error(this.status, this.statusText);
      };

      xhr.open('get', '/support/isLoginUser');
      xhr.responseType = 'json';
      xhr.send();
    },
    toLogout: function (retUrl) {
      this.setPassportUrl('logout', retUrl)
    },
    toLogin: function (retUrl) {
      this.setPassportUrl('login', retUrl)
    },
    toRegister: function(retUrl) {
      this.setPassportUrl('register', retUrl)
    },
    setPassportUrl: function (pageName, retUrl) {
      Passport.setUrl(this.getPassportUrl(pageName, retUrl))
    },
    getPassportUrl: function (pageName, retUrl) {
      retUrl = '';
      var url, path = '';
      var env = this.runtimeEnv;
      var o   = Passport.location();
      var prefix = '/passport/' + pageName + '?retUrl=';

      if (retUrl) {
        path = prefix + encodeURIComponent(o.origin + retUrl);
      } else {
        path = prefix + encodeURIComponent(o.href);
      }

      if (env.isLocal) {
        url = o.protocol + this.domains.local + path;
      } else
      if (env.isTest) {
        url =  o.protocol + this.domains.test + path;
      } else
      if (env.isProd) {
        url =  o.protocol + this.domains.prod + path;
      }

      return url;
    },
    /**
     *
     * @desc 传入不同环境指定的URL，会根据不同的环境返回相对应的URL
     * @param options
     * @return {{env: *, url: *, origin: {href: *, protocol: string, hostname: *, port: *, origin: *}}}
     */
    parseEnvGetUrl: function(options) {
      var defs = {
        local: '',
        test : '',
        prod : '',
      };
      var sets = Passport.extend({}, defs, options);

      var location = window.location,
          protocol = location.protocol + '//',
          hostname = location.hostname,
          pathname = location.pathname,
          href     = location.href,
          port     = location.port;

      var devDomain     = protocol + hostname + ':' + port,
          productDomain = protocol + hostname;
      var origin, url, env;

      if (/^localhost/.test(hostname)) {
        origin = devDomain;
        url    = sets.local;
        env    = 'local';
      } else
      if (/^\d+(\.\d+){3}/.test(hostname)) {
        origin = devDomain;
        url    = sets.test;
        env    = 'test';
      } else
      if (/^\S+(\.\S+){2,}/.test(hostname)) {
        origin = productDomain;
        url    = sets.prod;
        env    = 'prod';
      }

      return {
        env: env,
        url: url,
        origin: {
          href: href,
          protocol: protocol,
          hostname: hostname,
          pathname: pathname,
          port: port,
          origin: origin
        },
      }
    }
  };

  Passport.isArray = function isArray(arr) {
    if (typeof Array.isArray === 'function') {
      return Array.isArray(arr);
    }

    return Object.prototype.toString.call(arr) === '[object Array]';
  };

  Passport.isPlainObject = function isPlainObject(obj) {
    if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
      return false;
    }

    var hasOwnConstructor = Object.prototype.hasOwnProperty.call(obj, 'constructor');
    var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf');
    // Not own constructor property must be Object
    if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
      return false;
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    var key;
    for (key in obj) { /**/ }

    return typeof key === 'undefined' || Object.prototype.hasOwnProperty.call(obj, key);
  };

  Passport.extend = function() {
    var options, name, src, copy, copyIsArray, clone;
    var target = arguments[0];
    var i = 1;
    var length = arguments.length;
    var deep = false;

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
      deep = target;
      target = arguments[1] || {};
      // skip the boolean and the target
      i = 2;
    }
    if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
      target = {};
    }

    for (; i < length; ++i) {
      options = arguments[i];
      // Only deal with non-null/undefined values
      if (options != null) {
        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name];

          // Prevent never-ending loop
          if (target !== copy) {
            // Recurse if we're merging plain objects or arrays
            if (deep && copy && (Passport.isPlainObject(copy) || (copyIsArray = Passport.isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && Passport.isArray(src) ? src : [];
              } else {
                clone = src && Passport.isPlainObject(src) ? src : {};
              }

              // Never move original objects, clone them
              target[name] = Passport.extend(deep, clone, copy);

              // Don't bring in undefined values
            } else if (typeof copy !== 'undefined') {
              target[name] = copy;
            }
          }
        }
      }
    }

    return target;
  };

  Passport.setUrl = function (url) {
    var el  = document.createElement('a');
    el.href = url;
    el.click();
  };

  Passport.runtimeEnv = function() {
    var hostname = window.location.hostname;
    var isLocal = false, isTest = false, isProd = false;

    /**
     * 检测开发环境
     *
     * @desc 也可以利用 localStorage.runtimeEnv = 'local' 将运行环境设置为本地（使用场景：本地开发使用ip地址访问时）
     */
    if (/^localhost/.test(hostname) || (/^\d+(\.\d+){3}/.test(hostname) && localStorage.runtimeEnv === 'local')) {
      isLocal = true;
    } else
    if (/^\d+(\.\d+){3}/.test(hostname)) {
      isTest = true;
    } else
    if (/^\S+(\.\S+){2,}/.test(hostname)) {
      isProd = true;
    }

    return {
      isLocal,
      isTest,
      isProd
    }
  };

  Passport.location = function() {
    var location = window.location,
        protocol = location.protocol + '//',
        hostname = location.hostname,
        pathname = location.pathname,
        href     = location.href,
        port     = location.port,
        origin   = protocol + location.host;

    return {
      href    : href,
      protocol: protocol,
      hostname: hostname,
      pathname: pathname,
      port    : port,
      origin  : origin
    }
  };

  window.XY = window.XY || {};

  XY.passportInit = function (env) {
    if (Object.prototype.toString.call(env) !== '[object Object]') throw new Error('参数必填，且类型必须是纯粹的对象');
    if (!(env.local && env.test && env.prod)) throw new Error('参数错误！示例, 不同环境passport的域名: {local: "http://localhost:8085", test: "http://211.144.5.130:8075", prod: "https://passport.urwork.cn"}');
    if (window.XY.passport) return;
    window.XY.passport = new Passport(env);
  };

  XY.Passport = Passport;
})(window, document);
