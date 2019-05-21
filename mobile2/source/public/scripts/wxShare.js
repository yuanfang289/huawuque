UR.wxShare = function(opts) {
    if (!UR.clientTest.isWechat) return;
    if (typeof wx !== 'object') return;
    $.ajax({
        url: '/weixin/configJson',
        dataType: 'json',
        type: 'post',
        data: {
            url: encodeURIComponent(location.href)
        },
        success: function(res) {
            if (res.retCode !== 0) {
                UR.msg('微信分享配置接口错误');
                return;
            }

            if (typeof wx !== 'object') return;

            var data = res.data;
            wx.config({
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList:['onMenuShareTimeline','onMenuShareAppMessage']
            });

            wx.ready(function() {
                var title = opts.title || document.title;
                var img = opts.imgUrl;
                var params = function() {
                    return {
                        title: title,
                        link: window.location.href,
                        imgUrl: img,
                        success: function() {
                            opts.success && opts.success(true);
                        }
                    }
                };
                wx.onMenuShareTimeline(params());
                wx.onMenuShareAppMessage($.extend({
                    desc: opts.desc || 'm.urwork.cn',
                }, params()));
            });
        }
    });
};
