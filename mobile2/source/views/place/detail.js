var Detail = {
    init: function() {
        if ($('.detail-slide').length) {
            UR.mainSlide('.detail-slide');
        }

        this.toggleDetail();

        $(".lazy").lazy({domain: ['static.urwork.cn']});
    },
    toggleDetail: function() {
        var $btn = $('.see-more');
        var $icon = $btn.find('i');
        var $span = $btn.find('span');
        var $info = $('.banner-brief');

        $btn.off(UR.click).on(UR.click, function(evt) {
            evt.preventDefault();

            if ($icon.hasClass('rotate')) {
                $span.text('展开场地详情');
                $icon.removeClass('rotate');
            } else {
                $span.text('收起场地详情');
                $icon.addClass('rotate');
            }
            $info.slideToggle();
        });
    }
};
$(function() {
    Detail.init();
});
