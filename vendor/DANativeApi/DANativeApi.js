/**
 * 获取 userAgent
 * @return {string}
 */
function getUserAgent() {
  return window.navigator.userAgent
}

/**
 * @desc android客户端或者uc浏览器
 * @return {boolean}
 */
function getIsAndroid() {
  const UA = getUserAgent();
  return UA.indexOf('Android') > -1 || UA.indexOf('Linux') > -1
}

/**
 * @desc  ios客户端
 * @return {boolean}
 */
function getIsiOS() {
  const UA = getUserAgent();
  return !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

/**
 * 获取客户端Flag
 * @return {RegExpMatchArray | null | undefined}
 */
function getClientFlag() {
  const UA = getUserAgent();
  return UA.match(/URWork\/\d+\.\d+.\d+/) || undefined
}

/**
 * 获取客户端版本字符串
 * @return {egExpMatchArray | string}
 */
function getClientVersionToString() {
  let clientFlag = getClientFlag();
  return clientFlag && clientFlag[0].replace('URWork/', '')
}

/**
 *  获取客户端版本数值
 * @return {egExpMatchArray | string | number}
 */
function getClientVersionToNumber() {
  let versionString = getClientVersionToString();
  return versionString && +versionString.replace(/\./g, '')
}

/**
 * 获取api版本
 * @desc 返回值{1}代表老版本api; {2}代表新版本api; {undefined}代表没有提供api
 * @return {1 | 2 | undefined}
 */
function getApiVersion() {
  const versionNumber = getClientVersionToNumber();
  const isAndroid = getIsAndroid();
  const isiOS = getIsiOS();
  return versionNumber ? ((isAndroid && versionNumber >= 218) || (isiOS && versionNumber >= 217) ? 2 : 1) : undefined;
}

/**
 * 验证原生API是否存在
 * @param  {string} apiName api名称
 * @return {boolean}         true 合法 or false 不合法
 */
function verifyHasFunction(apiName) {
  const native = window.webkit || window.androidJsInterface;
  const apiVersion = getApiVersion();
  // 如果不是新版api，则返回
  if (apiVersion !== 2) {
    console.log('app版本不支持 %c"' + apiName + '"', 'color:red', '方法');
    return false
  }

  // 未提供原生API(可能为浏览器环境)
  if (!native) {
    console.log('未提供原生API');
    return false;
  }

  // Android客户端
  if (getIsAndroid() && native[apiName]) return true;

  // ios客户端
  if (getIsiOS() && native.messageHandlers[apiName]) return true;

  console.log('APP原生API %c"' + apiName + '"', 'color:red', '不存在');
  return false;
}

/**
 * 将js function 转化为 string，便于传参
 * @param  {object} param 参数
 * @return {object}       处理后的参数
 */
function convertFunctionToString(param) {
  const cb = param.completion;
  if (typeof cb === "function") {
    param.completion = cb.toString();
  }
  return param;
}

/**
 * 调用native 端 Api
 * @param  {string} apiName Api名称
 * @param  {object} param   参数，其中包含回调
 * @return {void}         无返回值
 */
function callNativeApi(apiName, param) {
  param = param && convertFunctionToString(param) || {};

  if (!verifyHasFunction(apiName)) return;

  if (getIsiOS()) {
    window.webkit.messageHandlers[apiName].postMessage(param);
  } else {
    window.androidJsInterface[apiName](JSON.stringify(param));
  }
}

class DANativeApi {
  constructor(api) {
    /**
     * 可用的Api列表，此属性为动态，外部通过generateApi增加或者deleteApi减少Api都会影响此数组的内容
     * @type {Array}
     * @private
     */
    this.availableApis = [];

    // 生成默认的Api
    api.availableApis.forEach(apiName => {
      this.generateApi(apiName);
    });
  }

  /**
   * 生成Api
   * @param  {string} apiName api的名称
   */
  generateApi(apiName) {
    if (this[apiName]) return;

    this[apiName] = function (param) {
      callNativeApi(apiName, param);
    };
    this.availableApis.push(apiName);
  }

  /**
   * 删除Api
   * @param  {function} apiName api的名称
   */
  deleteApi(apiName) {
    delete this[apiName];
    var index = this.availableApis.indexOf(apiName);
    if (index !== -1) {
      this.availableApis.splice(index, 1);
    }
  }

  testNative(apiName) {
    return verifyHasFunction(apiName)
  }

  get getApis() {
    return this.availableApis.join("\n")
  }

  get apiVersionString() {
    return getClientVersionToString()
  }

  get apiVersionNumber() {
    return getClientVersionToNumber()
  }

  get isNewApi() {
    const apiVersion = getApiVersion();
    return apiVersion === 2
  }
}

export default function() {
  const DEFAULT = {
    availableApis: [
      "share",
      "choosePhoneContact",
      "payment",
      "navigateTo",
      "redirectTo",
      "navigateBack",
      "showMessage",
      "showLoading",
      "hideLoading",
      "showNavigationBar",
      "showShareButton",
      "inputTextContent",
      "setIsRefresh",
      "networkInfo",
      "longRentStationPayment",
      "webViewResize",
      "reload",
      "showNavigationBar",
      "setStatusBarStyle",
      "selectCompany",
      "asUShow",
      "changeImage"
    ]
  };

  if (DANativeApi.inst) return;
  DANativeApi.inst = new DANativeApi(DEFAULT);
  return DANativeApi.inst
}
