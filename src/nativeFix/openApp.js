import getSystemInfo from 'vendor/systemInfo/systemInfo';
import {openAppParams} from 'config/feature';

/**
 * 在H5中打开原生APP，并跳转指定页面
 *
 * @desc  不建议直接使用，请使用openApp组件
 * @param url
 */
export default function openApp(url) {
  const systemInfo = getSystemInfo();

  const IFRAMEID = 'plugin_loadIframe';
  let loadIframe = null, timerList = [];

  window.onblur = clearTimer;

  // 窗口焦点消失时，清除所有计时器
  function clearTimer() {
    for (let i = 0; i < timerList.length; i++) {
      clearTimeout(timerList[i]);
    }
  }

  // 超时跳转
  function timeout(time, url) {
    let now = Date.now();
    if (time && (now - time) < (1500 + 200)) {
      location.href = url;
    }
  }

  // 生成url
  function createUrl(params) {
    if (params.intentUrlParams) {
      let url = encodeURIComponent(params.intentUrlParams);
      params.chromeUrl = params.appUrl;
      params.appUrl    = `${params.appUrl}?url=${url}`;
      params.iosAppUrl = `${params.iosAppUrl}?url=${url}`;
    }
    return params;
  }

  // 读取参数
  function getArgs(url) {
    return {
      ...openAppParams.links,
      intentUrlParams: url || null // 接收的参数
    }
  }

  // 重定向
  function redirect(params, isJump) {
    let openUrl = createUrl(params);
    let downUrl = null;

    // 微信或QQ中
    if (systemInfo.isWechat || systemInfo.isQQ) {
      let url = null;

      // 如果微信检测到app已安装, 则打开app，否则在微信中下载app
      if (systemInfo.iosVer >= 9.2) {
        url = openUrl.iosAppUrl;
      } else {

        // 微信中下载app
        url = params.downWecart;
      }

      location.href = url;
      return;
    }

    if (systemInfo.isIos) {
      // app store
      downUrl = params.downAppUrl;
    } else {
      // app download page
      downUrl = params.downAppUrl;
    }

    // 安卓chrome
    if (systemInfo.isAndroid) {
      if (systemInfo.isChrome) {
        openUrl.appUrl = openAppParams.getChromeScheme(openUrl.chromeUrl, params.intentUrlParams);

        setTimeout(function() {
          location.href = openUrl.appUrl;
        }, 50)
      }
    }

    // 如果是safari 且 ios版本大于等于9.2，则执行ios接口，否则走统一接口
    if (systemInfo.isIos && systemInfo.iosVer >= 9.2) {
      location.href = openUrl.iosAppUrl;
      return;
    } else {

      // 安卓及ios9.2一下和其他浏览器，走此逻辑
      document.querySelector(`#${IFRAMEID}`).src = openUrl.appUrl;
    }

    // 超时跳转下载页
    let sTime = Date.now();
    setTimeout(function() {
      if (isJump) {
        let timer = setTimeout(function() {
          timeout(sTime, downUrl);
        }, 1500);
        timerList.push(timer);
      }
    }, 100)
  }

  // getIntentIframe
  function getIntentIframe(params) {
    if (!loadIframe) {
      let iframe = document.createElement("iframe");
      iframe.id = IFRAMEID;
      document.body.appendChild(iframe);
      document.getElementById(IFRAMEID).style.display = "none";
      document.getElementById(IFRAMEID).style.width = "0px";
      document.getElementById(IFRAMEID).style.height = "0px";
      loadIframe = true;
    }
    redirect(params, true);
  }

  getIntentIframe(getArgs(url))
}
