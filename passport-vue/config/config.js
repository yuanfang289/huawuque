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
let requestUrl = '', requestDomain = '';

/**
 *
 * @type {string} requestPath    接口请求路径
 * @desc 使用devServer 热重载时，使用代理/api作为路径
 */
const requestPath = module.hot ? '/api' : '';

// mock 和开发环境域名，仅用于devServer代理
const mockUrl   = '';
let devDomain   = 'http://localhost:8085';
let debugDomain = 'http://api.test.urwork.cn';

// 测试环境和生成环境一般不需要配置域名(不能加http[s]://)
let testDomain  = 'api.test.urwork.cn';
let prodDomain  = 'api.urwork.cn';


let testDomain2  = 'api.test.ucommune.cn';
let prodDomain2  = 'api.ucommune.com';


if (PROD) {
  requestDomain = prodDomain;
}
if (TEST) {
  requestDomain = testDomain;
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
  testDomain2,
  prodDomain2,
  mockUrl
};

/**
 * @desc 接口请求域名
 */
const domain = requestDomain;

module.exports = {
  requestUrl,
  env,
  domains,
  domain
};
