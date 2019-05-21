import getSystemInfo from 'vendor/systemInfo/systemInfo';
import {runEnv, getLocation, getQueryParams} from './index';
import {website} from 'config/feature';
import storage from 'utils/storage';
let {getStorageByName} = storage;

/**
 *
 * @param {boolean=} readStorageRetUrl   是否从storage中读取retUrl
 */
export default function redirect(readStorageRetUrl) {
  let {isMobile} = getSystemInfo();
  let env = runEnv();
  let {protocol, hostname} = getLocation();
  let query = getQueryParams();

  const retUrl = (readStorageRetUrl ? getStorageByName('retUrl', true) : query['retUrl']) || '';

  let site = protocol + (isMobile ? website['m'] : website['www'])[env.currentEnv];

  // 如果retUrl参数存在
  if (retUrl) {
    let origin = parseHostname(hostname);
    let target = parseHostname(retUrl);

    // 生产环境下，来源域名非本网站域名，则直接跳转到网站首页
    if (env.isProd && target.indexOf(origin) < 0) {
      location.replace(site);
      return
    }

    location.replace(retUrl);
    return
  }

  // 如果retUrl不存在，则直接跳转都网站首页
  location.replace(site);

  function parseHostname(hostname) {
    return hostname.split('.').reverse().slice(0, 2).reverse().join('.');
  }
}
