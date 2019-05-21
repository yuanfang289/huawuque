export default function getSystemInfo(userAgent) {
  const ua = (userAgent || window.navigator.userAgent).toLowerCase();

  const regex = {
    android: /(android);?[\s\/]+([\d.]+)?/,
    ios: /(iphone|ipad)/,
    mobile: /mobile/,

    // 浏览器类型
    chrome: [/chrome/, /version\/\d+\.\d+(\.\d+)?\schrome\//],
    safari: /safari/,
    firefox: /firefox/,
    ucBrowser: /ucbrowser/,
    qqBrowser: /mqqbrowser/,

    // webview
    qq: /[^m]qq\//,
    wechat: /micromessenger/,
    weibo: /weibo/,

    // 此项为APP自定义UA
    device: /\(device\/[\s\w]+\)/,

    ipad: /(ipad).*os\s([\d_]+)/,
    iphone: /(iphone\sos)\s([\d_]+)/,
  };

  function match(regex, userAgent) {
    return regex.test(userAgent);
  }

  // 获取ios系统版本
  function getIosVer(str) {
    const tmp = str.split('_');
    return tmp.join('.');
  }

  const _ipad     = ua.match(regex.ipad),
      _iphone     = ua.match(regex.iphone),
      _android    = ua.match(regex.android),
      _device     = ua.match(regex.device) ? ua.match(regex.device)[0] : '',

      // TODO 此功能由原生APP提供UA信息
      _deviceType = _device.replace(/^\(device\/([\s\w]+)\)$/, '$1');

  return {
    iosVer      : (_ipad && getIosVer(_ipad[2])) || (_iphone && getIosVer(_iphone[2])) || undefined,
    androidVer  : (_android && _android[2]) || undefined,
    deviceType  : _deviceType,

    isAndroid   : match(regex.android, ua),
    isIos       : match(regex.ios, ua),
    isMobile    : match(regex.mobile, ua),

    isChrome    : match(regex.chrome[0], ua) && !match(regex.chrome[1], ua),
    isSafari    : match(regex.ios, ua) && match(regex.safari, ua),
    isFirefox   : match(regex.firefox, ua),
    isUC        : match(regex.ucBrowser, ua),
    isQQBrowser : match(regex.qqBrowser, ua) && !match(regex.qq, ua),

    isQQ        : match(regex.qq, ua),
    isWechat    : match(regex.wechat, ua),

    // TODO 此功能由原生APP提供UA信息
    isIphoneX   : _deviceType === 'iphone x'||_deviceType === 'iphone xs'||_deviceType === 'iphone xs max'||_deviceType === 'iphone xr'
  }
}
