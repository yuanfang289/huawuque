export function runtimeEnv() {
  let hostname = window.location.hostname;
  let isLocal = false, isTest = false, isProd = false;

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
}

export function location() {
  let location  = window.location,
      protocol  = location.protocol + '//',
      origin    = protocol + location.host;

  const {
    hostname,
    href,
    port,
    pathname
  } = location;

  return {
    href,
    protocol,
    hostname,
    pathname,
    port,
    origin
  }
}

export function setUrl(url) {
  let el  = document.createElement('a');
  el.href = url;
  el.click();
}

export function isPlainObject(obj) {
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
    return false;
  }

  let hasOwnConstructor = Object.prototype.hasOwnProperty.call(obj, 'constructor');
  let hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf');
  // Not own constructor property must be Object
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  let key;
  for (key in obj) { /**/ }

  return typeof key === 'undefined' || Object.prototype.hasOwnProperty.call(obj, key);
}

export function isArray(arr) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(arr);
  }

  return Object.prototype.toString.call(arr) === '[object Array]';
}

/**
 *
 * @desc 传入不同环境指定的URL，会根据不同的环境返回相对应的URL
 * @param options
 * @return {{env: *, url: *, origin: {href: *, protocol: string, hostname: *, port: *, origin: *}}}
 */
export function parseEnvGetUrl(options) {
  let defs = {
    local: '',
    test : '',
    prod : '',
  };
  let sets = Object.assign({}, defs, options);

  let location  = window.location,
      protocol  = location.protocol + '//';

  let {
    hostname,
    pathname,
    href,
    port
  } = location;

  let devDomain     = protocol + hostname + ':' + port,
      productDomain = protocol + hostname;
  let origin, url, env;

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
      href,
      protocol,
      hostname,
      pathname,
      port,
      origin
    },
  }
}

/**
 * @class Passport
 */
class Passport {
  constructor(domains) {
    this.domains = domains;
    this.runtimeEnv = runtimeEnv();
  }

  isLogin(options) {
    options = options || {};
    const success  = typeof options.success  === 'function' ? options.success  : function() {};    // 登录成功
    const fail     = typeof options.fail     === 'function' ? options.fail     : function() {};    // 登录失败
    const error    = typeof options.error    === 'function' ? options.error    : function() {};    // 接口请求错误
    const xhr = new XMLHttpRequest();
    let url = '/support/isLoginUser';

    if (module.hot) {
      // prefix 只用于devServer proxy
      if (this.domains.prefix) {
        url = `/${this.domains.prefix}${url}`
      } else {
        url = `/api${url}`
      }
    }

    xhr.onload = function() {
      const res = this.response || {};
      if (res.success) {
        success(res);
      } else {
        fail();
      }
    };
    xhr.onerror = function() {
      error(this.status, this.statusText);
    };

    xhr.open('get', url);
    xhr.responseType = 'json';
    xhr.send();
  }

  toLogout(retUrl) {
    this.setPassportUrl('logout', retUrl)
  }

  toLogin(retUrl) {
    this.setPassportUrl('login', retUrl)
  }

  toRegister(retUrl) {
    this.setPassportUrl('register', retUrl)
  }

  setPassportUrl(pageName, retUrl) {
    setUrl(this.getPassportUrl(pageName, retUrl))
  }

  getPassportUrl(pageName, retUrl = '') {
    let url;
    let env = this.runtimeEnv,
        o   = location();
    let path = '';

    if (retUrl) {
      path = `/passport/${pageName}?retUrl=${encodeURIComponent(o.origin + retUrl)}`;
    } else {
      path = `/passport/${pageName}?retUrl=${encodeURIComponent(o.href)}`;
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
  }
}

export default function passportInit(env) {
  if (Object.prototype.toString.call(env) !== '[object Object]') throw new Error('参数必填，且类型必须是纯粹的对象');
  if (!(env.local && env.test && env.prod)) throw new Error('参数错误！示例, 不同环境passport的域名: {local: "localhost:8085", test: "211.144.5.130:8075", prod: "passport.urwork.cn"}');
  if (Passport.inst) return;
  Passport.inst = new Passport(env);
  return Passport.inst
}
