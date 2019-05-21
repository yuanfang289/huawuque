/**
 * 获取当前运行环境
 *
 * @desc   {isLocal: 本地环境, isTest: 测试环境, isProd: 生成环境}
 * @return {{isLocal: boolean, isTest: boolean, isProd: boolean, currentEnv: string}}
 */
export default function runEnv() {
  const hostname = location.hostname;
  let isLocal = false, isTest = false, isProd = false;
  let currentEnv = '';

  /**
   * 检测开发环境
   *
   * @desc 也可以利用 localStorage.runtimeEnv = 'local' 将运行环境设置为本地（使用场景：本地开发使用ip地址访问时）
   */
  if (/^localhost/.test(hostname) || localStorage.runtimeEnv === 'local') {
    isLocal = true;
    currentEnv = 'local';
  } else
  if (/^\S+\.test(\.\S+){2,}/.test(hostname)) {
    isTest = true;
    currentEnv = 'test';
  } else
  if (/^\S+(\.\S+){2,}/.test(hostname)) {
    isProd = true;
    currentEnv = 'prod';
  }

  return {
    isLocal,
    isTest,
    isProd,
    currentEnv
  }
}
