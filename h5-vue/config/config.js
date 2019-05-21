/**
 * Node.js 环境变量
 * 由webpack DefinePlugin插件转成常量值
 */
const NODE_ENV = process.env.NODE_ENV;

/**
 * 请求接口域名，根据参数使用不同的接口地址
 *
 * @type {boolean} PROD    是否生产环境
 * @type {boolean} TEST    是否测试环境
 * @type {boolean} DEBUG   是否远程调试
 * @type {boolean} DEV     是否开发环境
 * @type {boolean} MOCK    是否使用mock数据
 */
const PROD  = NODE_ENV === 'production',
      TEST  = NODE_ENV === 'test',
      DEV   = NODE_ENV === 'dev',
      DEBUG = NODE_ENV === 'debug',
      MOCK  = NODE_ENV === 'mock';

/**
 *
 * @type {string} requestUrl     接口请求地址
 * @type {string} requestDomain  接口请求域名
 */
let requestUrl = '', requestDomain = '', httpStr = '',httpapi3 = '',httpgateway = '';

/**
 *
 * @type {string} requestPath    接口请求路径
 * @desc 使用devServer 热重载时，使用代理/api作为路径
 */
const requestPath = module.hot ? '/api' : '';

// mock 和开发环境域名，仅用于devServer代理
const mockUrl     = 'https://www.easy-mock.com/mock/5acf605966522e0ead17f960';
const devDomain   = 'http://localhost:8083';
const debugDomain = 'https://m.urwork.cn';

// 测试环境和生成环境一般不需要配置域名
const testDomain  = '';
const prodDomain  = '';

//部分接口
const prodHttp = 'https://points.urwork.cn';
const testHttp = 'https://points-test.urwork.cn';
//会员卡接口
const prodapi3 = 'https://api3.urwork.cn';
const testapi3 = 'https://api3-test.urwork.cn';
//gateway
const prodgateway = 'https://gateway.urwork.cn';
const testgateway = 'https://api3-test.urwork.cn';


if (PROD) {
  requestDomain = prodDomain;
  httpStr = prodHttp;
  httpapi3 = prodapi3;
  httpgateway = prodgateway;
}
if (TEST) {
  requestDomain = testDomain;
  httpStr = testHttp;
  httpapi3 = testapi3;
  httpgateway = testgateway;
}
if (DEBUG) {
  httpStr = testHttp;
  httpapi3 = testapi3;
  httpgateway = testgateway;
}

/**
 * @desc 接口请求链接
 */
requestUrl = MOCK ? mockUrl : requestDomain + requestPath;

/**
 * 输出当前环境对象
 * @type {{PROD: boolean, TEST: boolean, DEV: boolean, MOCK: boolean}}
 */
const env = {
  PROD,
  TEST,
  DEV,
  MOCK,
  DEBUG
};

/**
 * 输出各环境域名定义
 * @type {{devDomain: string, testDomain: string, prodDomain: string, mockUrl: string}}
 */
const domains = {
  devDomain,
  testDomain,
  prodDomain,
  debugDomain,
  mockUrl,
  prodHttp,
  testHttp
};

/**
 * @desc 接口请求域名
 */
const domain = requestDomain;

/**
 * 路由前缀
 * @desc 目的是为了兼容现有非前后端分离并存的模式
 */
// const routePrefix = DEV || MOCK || DEBUG ? '' : '/v2';
const routePrefix = '/v2';
const routePrehttp = httpStr;
module.exports = {
  requestUrl,
  env,
  domains,
  domain,
  httpapi3,
  routePrefix,
  routePrehttp,
  httpgateway
};
