
/**
 * 网站链接
 *
 * @desc 不同客户端及不同环境的网站链接，一般用于跨客户端跳转
 * @type {{www: {local: string, test: string, prod: string}}}
 */
let website = {
  www: {
    local: 'localhost:8080',
    test: 'www.test.urwork.cn',
    prod: 'www.urwork.cn'
  },
  m: {
    local: 'localhost:8083',
    test: 'm.test.urwork.cn',
    prod: 'm.urwork.cn'
  }
};
/**
 * 验证规则
 */
let regx = {
  isApp: /URWork/i,
};
/**
 * 存储 localStorage 的键名
 */
let localStorageKey = 'cn.urwork.passport';
let storageKeyName = 'cn.urwork';

/**
 * 具有识别性的文本
 * @desc 提取具有识别性的文本，如：网站名称、公司名称等；便于移植统一修改
 */
let feature = {
  defTitle: ''
};

module.exports = {
  feature,
  localStorageKey,
  regx,
  storageKeyName,
  website
};
