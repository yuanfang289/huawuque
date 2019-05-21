/**
 * 百度统计
 */
export function badiuStatistics() {
  window._hmt = window._hmt || [];
  let hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?0a64fb3a537c3d61aca5f514dee38de5";
  let s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
}

/**
 * GrowingIO
 * @param {object}  res   登录用户的信息
 */
export function growingIOStatistics(res) {
  window._vds = window._vds || [];

  let growingInit = function () {
    let vds = document.createElement('script');
    vds.type = 'text/javascript';
    vds.async = true;
    vds.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'assets.growingio.com/vds.js';
    let s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(vds, s);
  };

  if (res.success) {
    let id = res.userId;
    let name = res.realName;
    let mobile = res.mobile;
    let enterType = res.enterType;

    _vds.push(['setAccountId', 'b156684790ab2633']);
    _vds.push(['setCS1', 'user_id', id]);
    _vds.push(['setCS3', 'real_name', name]);
    _vds.push(['setCS4', 'mobile', mobile]);
    _vds.push(['setCS5', 'enter_type', enterType]);
  } else {
    _vds.push(['setAccountId', 'b156684790ab2633']);
  }

  growingInit();
}
