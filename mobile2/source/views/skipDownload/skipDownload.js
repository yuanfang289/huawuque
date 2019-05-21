/**
 * Created by litingfeng on 16/09/21.
 */

var SkipDownload = {
    init: function() {
        this.download();
    },
    download: function() {
        var UA =  navigator.userAgent.toLocaleLowerCase();
        var android = UA.match(/(android);?[\s\/]+([\d.]+)?/) ? true : false; // Android
        var ipad = UA.match(/(ipad).*os\s([\d_]+)/) ? true : false; // ipad
        var iphone = UA.match(/(iphone\sos)\s([\d_]+)/) ? true : false; // iphone
        var btn = $('.btn');
        var androidAttr = btn.attr("data-android");
        var iosAttr = btn.attr("data-ios");
        var weixinAttr = btn.attr("data-weixin");
        var isWeixin = UA.match(/micromessenger/i) ? true : false;
        var isQQ = UA.match(/(qq|mqqbrowser)/i) ? true : false;
        var any = function() {
            btn.hide();
            $('.hotlink').show();
        };
        $('body').on('click', '.btn', function() {
            if (android) {
                if (androidAttr) {
                    if (isWeixin || isQQ) {
                        location.href = weixinAttr;
                    } else {
                        location.href = androidAttr;
                    }
                } else {
                    return;
                }
            } else if (iphone || ipad) {
                if (iosAttr) {
                    if (isWeixin || isQQ) {
                        location.href = weixinAttr;
                    } else {
                        location.href = iosAttr;
                    }
                } else {
                    return;
                }
            } else {
                any();
            }
        });

    },
};
$(function() {
    SkipDownload.init();
});
